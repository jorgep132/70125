// Importaciones
import express from 'express';
import { uploader } from './utils/multer.js'; // Asegúrate de que `uploader` esté configurado correctamente
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import __dirname from './utils/dirname.js';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { realTimeProducts } from './routes/realTimeProducts.router.js';
import { home } from './routes/home.js';
import { productManager } from './public/js/products.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/realTimeProducts', realTimeProducts);
app.use('/home', home);
// Ruta para subir fotos
app.post('/api/upload-photo', uploader.single('thumbnails'), (req, res) => {
    if (req.file) {
        res.json({ filePath: `/images/${req.file.filename}` }); // Devuelve la ruta del archivo
    } else {
        res.status(400).json({ error: 'No se subió ningún archivo' });
    }
});

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Configuracion del server httpServer
const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});

// Creamos nuestro io por convencion
const io = new Server(httpServer);

// Bloque donde escuchamos y emitimos los eventos
// Escuchamos el evento 'connection' 
io.on('connection', async socket => {
    console.log('Cliente conectado');

    // Definimos nuestra funcion async que vamos a usar para obtener los productos y mostrarlos en tiempo real
    const realTimeProducts = async () => {
        const products = await productManager.getProducts();
        // Emitimos el evento con los productos 
        io.emit('products', products);
    };
    // Llamamos a la funcion 
    await realTimeProducts();

    // Escuchamos el evento subir_foto que usaremos en thumbnails
    socket.on('subir_foto', async formData => {
        // El thumbnails sera el formData que le brindamos con la foto subida del lado del cliente
        uploader.single('thumbnails')(formData, null, err => {
            if (err) {
                socket.emit('upload_error', err.message);
            } else {
                console.log('Foto subida correctamente');
            }
        });
    });

    // Escuchamos el evento agregar_producto
    socket.on('agregar_producto', async data => {
        // Usamos la funcion addProduct con la data, que en este caso es un objeto producto
        try {
            await productManager.addProduct(
                data.title,
                data.description,
                data.code,
                data.price,
                data.status,
                data.stock,
                data.category,
                data.thumbnails
            );
            // Si se cumplen todas las condiciones de addProduct emitimos el evento 'product_added_ok'
            // Se envia un mensaje de exito con toastify
            io.emit('product_added_ok')
            // Llamamos a la funcion para mostrar los productos en tiempo real, que en este caso se actualizan si se agrega uno
            await realTimeProducts();
        } catch (err) {
            // Si no se cumplen todas las condiciones se envia un mensaje con toastify
            socket.emit('product_error', err.message);
        }
    });

    // Escuchamos el evento 'eliminar_producto'
    socket.on('eliminar_producto', async parsedProductId => {
        // Intentamos usar la funcion deleteProduct con el id del producto
        try {
            // Se ejcuta la funcion
            await productManager.deleteProduct(parsedProductId);
            // Actualizamos los productos ya que ahora tendremos menos productos
            await realTimeProducts();
        } catch (err) {
            // Si falla se avisa en toastify y no actualizamos los productos
            socket.emit('products_delete_error', err.message);
        }
    });
});