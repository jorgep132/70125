// Importamos express
import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js'
import { uploader } from './utils/multer.js';

// Definimos la const app para usar express()
const app = express();
// Puerto que usaremos
const PORT = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', uploader.single('thumbnails'), productsRouter);
app.use('/api/carts', cartsRouter)

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en puerto ${PORT}`)
})

