// Importamos
import fs from 'fs'
import { productManager } from './products.js'

// Definimos la clase manager para los carts
class CartManager{
    constructor(path){
        this.path = path
        this.nextId = 1
        this.quantity = 1
        this.carts = []
        this.initializeId()
    }

    // Inicializamos los ID para que al generar un nuevo cart se tome el valor mas alto y se agregue +1
    async initializeId(){
        const carts = await this.getCarts()
        if(carts.length > 0){
            const maxId = Math.max(...carts.map(c=> c.id))
            this.nextId = maxId +1
        }
    }

    // Funcion para leer el JSON con todos los carts creados
    async getCarts(){
        try{
            const carts = await fs.promises.readFile(this.path, 'utf-8')
            let cart = JSON.parse(carts)
            return cart
        }catch(err){
            // Si no se puede leer el archivo devuelve un array vacio
            return []
        }
    }
    
    // Funcion para buscar un cart por su ID
    async getCartsById(id){
        const carts = await this.getCarts()
        const cart = carts.find(c => c.id === id)
        if(cart){
            return cart
        }else{
            throw new Error('Carrito no encontrado.')
        }
    }

    // Funcion para agregar un nuevo cart
    async addCart(){
        this.carts = await this.getCarts()
        let cart = {
            id: this.nextId++,
            products: []
        }
        this.carts.push(cart)
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8')
    }

    // Funcion para agregar productos a un cart
    async cartProducts(cartId, productId){
        this.carts = await this.getCarts()
        const fetchedProduct = await productManager.getProductById(productId)
        const fetchedCarritoIndex = this.carts.findIndex(c => c.id === cartId)
        if(!fetchedProduct){
            throw new Error('Producto no encontrado')
        }
        if(fetchedCarritoIndex === -1 ){
            throw new Error('Carrito no encontrado.')
        }
        // Agregar toda la info del producto al carrito.
        // let cartProduct = {
        //     ...fetchedProduct,
        //     quantity: this.quantity
        // }

        // Agregar solamente el ID como pide la pre-entrega
        let cartProduct = {
            id: fetchedProduct.id,
            quantity: this.quantity
        }
        // Validamos que el id del carrito exista
        // const cartIndex = this.carts.findIndex(c => c.id === cartId)
        // if(cartIndex === -1){
        //     return `Carrito no encontrado.`
        // }
        const productIndex = this.carts[fetchedCarritoIndex ].products.findIndex(p => p.id === productId)
        if(productIndex === -1){
            this.carts[fetchedCarritoIndex ].products.push(cartProduct)
        } else{
            this.carts[fetchedCarritoIndex ].products[productIndex].quantity += this.quantity
        }
        await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2), 'utf-8')
    }
}

// Instanciamos un objeto de la clase CartManager
const cartManager = new CartManager('./carritos.json')
// Lo exportamos para luego usarlo en el router de cart
export {cartManager}
