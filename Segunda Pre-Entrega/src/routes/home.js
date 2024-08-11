import { Router } from 'express'
import { productManager } from '../public/js/products.js'

const home = Router()

// home donde vamos a tener los productos de manera estatica
// en esta url no se van a actualizar de forma automatica
home.use('/', async (req, res) =>{
    try{
        // Tomamos los productos con la funcion getProducts
        const fetchedProducts = await productManager.getProducts()
        // Renderizamos nuestro home.handlebars y le brindamos los productos 
        res.render('home.handlebars', {
            products: fetchedProducts
        }) 
    }catch(err){
        // Manejo de errores.
        res.status(500).send('Error al obtener los productos.')
    }
})

// Exportamos nuestro router
export { home }
