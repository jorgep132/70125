// Importamos
import express from 'express';
import { exportGet, exportListen, exportParams } from './servidor.js';
import fs from 'fs';

let testActivated = false;
// Codigo principal
class ProductManager{
    constructor(path){
        this.path = path
        this.products = []
        this.nextId = 1
        this.initializeId()
    }
    async initializeId(){
        const products = await this.getProducts()
        if(products.length > 0){
            const maxId = Math.max(...products.map(p=> p.id))
            this.nextId = maxId +1
        }
    }
    // Funcion para leer el archivo JSON y devolver los productos que encuentre
    async getProducts(){
        try {
            const products = await fs.promises.readFile(this.path,'utf-8')
            let product  = JSON.parse(products)
            return product;
        } catch (error) {
            return []
        }
    }
    // Funcion para agregar productos.
    async addProduct (title, description, price, thumbnail, code, stock){
        // Leemos el archivo JSON antes de comenzar a agregar productos, asi evitamos agregar duplicados despues
        this.products = await this.getProducts()
        
        //Verificamos que no falte ningun campo
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios.')
            return
        }
        if (typeof price !== 'number' || typeof stock !== 'number')
        {
            console.log(`El precio y el stock deben ser numeros.`)
            return
        }
        // Variable para asegurar que el codigo de producto sea unico.
        const isUniqueCode = this.products.some(product => product.code === code)
        if (isUniqueCode){
            console.log(`El codigo del producto debe ser unico.`)
            return
        }
        // Objeto producto con los valores del producto
        let product = {
            id: this.nextId++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock    
        }
        // Se agrega el producto al array productos.
        // Se omite la verificacion de duplicados ya que anteiormente verificamos que el
        // codigo del producto sea unico.
        this.products.push(product)
        console.log(`Se agrego el producto correctamente.`)
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
    }

    // Funcion para buscar un producto utilizando su id unico
    async getProductById(id){
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (product){
            return product
        }else{
            return `No se encontró un producto con ese id`
        }
    }
    async updateProduct(id, title, description, price, thumbnail, code, stock){
        const products = await this.getProducts()
        let product = products.find(product => product.id === id)
        if (!product) {
            return `No se encontró un producto con ese id`
        }
        if (title !== undefined) {
            product.title = title
        }
        if (description !== undefined) {
            product.description = description
        }
        if (price !== undefined ) {
            product.price = price
        }
        if (thumbnail !== undefined) {
            product.thumbnail = thumbnail
        }
        if (code !== undefined && product.code !== code) {
            const isUniqueCode = products.some(p => p.code === code)
            if (isUniqueCode) {
                return `El código '${code}' ya está en uso por otro producto. No se aplicaron cambios.`
            }
            product.code = code
        }
        if (stock !== undefined) {
            product.stock = stock
        }
        console.log(`Producto original: ${JSON.stringify(product, null, 2)}`)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
        console.log(`Se modificó el producto exitosamente: `)
        return products
    }
    async deleteProduct(id){
        const products = await this.getProducts()
        const productIndex = products.findIndex(p => p.id === id)
        if(productIndex !== -1){
            products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
            return `Se borró el producto exitosamente.`
        }else{
            return `No se encontró producto con ese id.`
        }
        
    }
}

const productManager = new ProductManager('./productos.json')

exportGet(productManager)
exportParams(productManager)
exportListen()


// Testing 
const test = async () =>{
    // Instanciamos
    // Agregamos productos
    // Estos tres productos se agregaran exitosamente
    //                              title                 description              price  thumbnail code  stock
    await productManager.addProduct('Arroz blanco', 'Arroz blanco de calidad',      1200, 'Foto',    9032,   5)
    await productManager.addProduct('Leche', 'Leche entera', 1500, 'Foto', 9034, 3);
    // Este producto, cuando ejecutemos el codigo una segunda vez se va a volver a agregar con id=8 debido a la explicacion posterior.
    await productManager.addProduct('Alfajor', 'Alfajor triple', 1100, 'Foto', 9038, 9);

    // Este producto no se agregara porque faltan campos
    await productManager.addProduct('Alfajor', 1100, 'Foto',   9038,    9);

    // Este producto no se agregara porque precio y/o el stock son un string
    await productManager.addProduct('Alfajor', 'Alfajor triple', '1100', 'Foto', 9038, 9);


    // Actualizamos productos
    // En el primer caso va a fallar ya que le estamos dando un id (9032) repetido
    console.log(await productManager.updateProduct(2, 'Manteca', 'Buena calidad', 3000, 'Foto', 9032, 100))

    // En este caso funcionara ya que le brindamos otro id que no esta en uso
    console.log(await productManager.updateProduct(2, 'Manteca', 'Buena calidad', 3000, 'Foto', 9055, 100))

    // Borra el producto con id = 3. Esto va a funcionar unicamente la primera vez que se ejecuta el codigo.
    // Esto se deba a que id siempre va a ir incrementandose. Si el producto con id 3 se borra, se borra tambien su id y no se reutiliza
    // En el momento que cargamos otro id, tomara id = 4 directamente.
    console.log(await productManager.deleteProduct(3))

    // Agregamos mas productos para verificar si el id 3 se utiliza o si se utiliza directamente el 4 y sigue incrementando.
    await productManager.addProduct('Pure de papa', 'Pure de papa instantaneo', 1200, 'Foto', 9039, 5)
    await productManager.addProduct('Dulce de leche', 'Dulc de leche Sancor', 1500, 'Foto', 9042, 3);
    await productManager.addProduct('Oreos', 'Galletitas oreos', 1100, 'Foto', 9058, 9);

    // Mostramos todos los productos.   
    console.log(await productManager.getProducts())
}
// Se comenta test() porque ya tengo el archivo JSON cargado luego de la primer ejecucion
// test()

