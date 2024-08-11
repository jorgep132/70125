import { Router } from 'express'
import { productManager } from '../public/js/products.js'

const realTimeProducts = Router()

// realTimeProducts.use('/', async (req, res) =>{
//     try{
//         const fetchedProducts = await productManager.getProducts()
//         res.render('realTimeProducts', {
//             products: fetchedProducts
//         }) 
//     }catch(err){
//         console.log('Error al obtener los productos.')
//         res.status(500).send('Error al obtener los productos.')
//     }
// })

realTimeProducts.use('/', (req, res)=>{
    res.render('realTimeProducts')
})

export { realTimeProducts }
