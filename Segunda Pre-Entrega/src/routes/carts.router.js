import Router from 'express'
import { cartManager } from '../public/js/carts.js'

const cartsRouter = Router()

// GET
cartsRouter.get('/', async (req, res) => {
    try {
      // Metodo getCarts de cartManager
      const cartsList = await cartManager.getCarts();
      res.status(200).send(cartsList)
    } catch (err) {
      res.status(500).send(err.message);
    }
});

// POST para agregar un cart
cartsRouter.post('/', async (req, res)=>{
    cartManager.addCart()
    res.status(200).send(`Carrito agregado con exito`)
})

// POST para agregar en un cart especifico (buscando por ID) un producto especifico (buscando por ID)
cartsRouter.post('/:cid/product/:pid', async (req, res)=>{
  // Tomamos el id del cart y el id del producto
    const cartId = parseInt(req.params.cid)
    const productId = parseInt(req.params.pid)
    try{
      await cartManager.cartProducts(cartId, productId)
      res.status(200).send(`Producto agregado al carrito ${cartId} con exito.`)
    }catch(err){
      res.status(500).send(err.message)
    }
})

// GET POR ID
cartsRouter.get('/:cid', async (req, res)=>{
  const cartId = parseInt(req.params.cid)
  try{
    const fetchedCart = await cartManager.getCartsById(cartId)
    res.status(200).send(`Carrito ${JSON.stringify(fetchedCart, null, 2)}`)
  }catch(err){
    res.status(500).send(err.message)
  }
})

// exportamos para usar en el servidor
export {cartsRouter}
