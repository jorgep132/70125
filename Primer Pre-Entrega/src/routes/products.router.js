import Router from 'express';
import { productManager } from '../products.js';

const productsRouter = Router();

// Middleware para manejar el parámetro `limit`
const limitMiddleware = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10);
  // Validamos que haya un limit marcado por el req del cliente y que este sea un numero valido
  if (req.query.limit && (isNaN(limit) || limit < 0)) {
    return res.status(400).send('Limite no valido');
  }
  // Validamos que el numero sea positivo o negativo para devolver null o el numero.
  req.limit = limit > 0 ? limit : null;
  next();
};

// GET con limit aplicado
productsRouter.get('/', limitMiddleware, async (req, res) => {
  try {
    const productsList = await productManager.getProducts();
    // Si req.limit no es null se usa slice para devolver la cantidad de productos que quiere ver el cliente, comenzando del indice 0
    // Si es null devuelve todos los productos.
    const limitedProducts = req.limit ? productsList.slice(0, req.limit) : productsList;
    res.json(limitedProducts);
  } catch (error) {
    res.status(500).send('Error al mostrar los productos.');
  }
});

// GET por ID
productsRouter.get('/:pid', async (req, res)=>{
  // Definimos id que tomara el param ingresado por el cliente y lo parsea a int ya que id en productManager es number
  const id = parseInt(req.params.pid)
  try {
      // Llamamos al metodo de productManager para buscar un producto por id
      const fetchedProduct = await productManager.getProductById(id)
      res.status(200).send(`Producto: ${JSON.stringify(fetchedProduct, null, 2)}`)
  }catch(err){
      res.status(404).send(err.message)
  }
  
})

// POST 
productsRouter.post('/', async (req, res) => {
  try {
      // Aplicamos reconstructing a req.body
      const { title, description, code, price, status, stock, category } = req.body;
      
      // Usamos la variable thumbnails para verificar si se subio un archivo, si este se subio se toma su path y se reemplazan las \ de windows por /
      // Se corta la ruta para que muestre desde public en adelante
      const thumbnails = req.file ? req.file.path.replace(/\\/g, '/').split('Primer Pre-Entrega/')[1] : null;

      // Agregamos el producto usando el metodo addProduct de productManager
      await productManager.addProduct(title, description, code, price, status, stock, category, thumbnails);
      res.status(201).send('Producto agregado con éxito.');
  } catch (error) {
      res.status(500).send(error.message);
  }
});

// DELETE
productsRouter.delete('/:pid', async (req, res)=>{
  // Buscamos el producto por ID
    const id = parseInt(req.params.pid)
    try {
        await productManager.deleteProduct(id)
        res.status(200).send(`Se elimino el producto correctamente`)
    }catch(err){
        res.status(404).send(err.message)
    }
})

// PUT
productsRouter.put('/:pid', async (req, res)=>{
  // Buscamos el producto por ID
    const id = parseInt(req.params.pid)
    const {title, description, code, price, status, stock, category, thumbnails } = req.body
    try{
        await productManager.updateProduct(id, title, description, code, price, status, stock, category, thumbnails)
        res.status(200).send(`Producto modificado con exito`)
    }catch(err){
        res.status(404).send(err.message)
    }
})

// exportamos para usar en el servidor
export { productsRouter };