// Importamos
import fs from 'fs';

// Codigo principal
class ProductManager{
    constructor(path){
        this.path = path
        this.products = []
        this.nextId = 1
        this.initializeId()
    }
    // Inicializamos el ID para saber cual es el ID de mayor valor, de esa manera la creacion de un nuevo producto partira de ahi +1
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
    async addProduct (title, description, code, price, status, stock, category, thumbnails){
        // Leemos el archivo JSON antes de comenzar a agregar productos, asi evitamos agregar duplicados despues
        this.products = await this.getProducts()
        const parsedPrice = parseFloat(price)
        const parsedStock = parseInt(stock, 10)
        //Verificamos que no falte ningun campo
        if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails){
            throw new Error('Todos los campos son obligatorios.')
        }
        // Validamos que el precio y stock parseados no sean tipo NaN
        if (isNaN(parsedPrice) || isNaN(parsedStock)){
            throw new Error(`El precio y el stock deben ser numeros.`)

        }
        // Si status no es ni true ni falso, por defecto sera true.
        if (status !== true && status !== false){
            status = true
        }
        // Variable para asegurar que el codigo de producto sea unico.
        const isUniqueCode = this.products.some(product => product.code === code)
        if (isUniqueCode){
            throw new Error(`El codigo del producto debe ser unico.`)
            
        }
        // Objeto producto con los valores del producto
        let product = {
            id: this.nextId++,
            title: title,
            description: description,
            code: code,
            price: parsedPrice,
            status: status,
            stock: parsedStock,
            category: category,
            thumbnails: thumbnails
        }
        // Se agrega el producto al array productos.
        // Se omite la verificacion de duplicados ya que anteiormente verificamos que el
        // codigo del producto sea unico.
        this.products.push(product)
        // Escribimos sobre el JSON
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
    }

    // Funcion para buscar un producto utilizando su id unico
    async getProductById(id){
        const products = await this.getProducts()
        const product = products.find(product => product.id === id)
        if (product){
            return product
        }else{
            throw new Error('Producto no encontrado.')
        }
    }
    
    // Funcion para actualizar un producto (buscandolo con su ID)
    async updateProduct(id, title, description, code, price, status, stock, category, thumbnails){
        // Llamamos a getProducts para leer el JSON
        const products = await this.getProducts()
        // Buscamos el index del id que el cliente va a solicitar a traves de PUT
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado')
        }
        // Nos ayudamos del operador spread para buscar el objeto especifico dentro del json que vamos a modificar
        products[productIndex] = {
            // Copiamos las propiedades del objeto que encontramos, basandonos en el indice (siendo el id que ingresa a traves del put)
            ...products[productIndex],
            // No se incluye el ID porque no puede ser modificado.
            // Si title no es undefined se va a agregar un nuevo valor a title: '' con lo que el usuario quiera actualizar
            // Si title es undefined no se agrega ningun valor y se mantiene el campo original
            ...(title !== undefined && { title }),
            ...(description !== undefined && { description }),
            ...(price !== undefined && { price }),
            ...(status !== true && { status }),
            ...(stock !== undefined && { stock }),
            ...(category !== undefined && { category }),
            ...(thumbnails !== undefined && { thumbnails }),
        };
        // Corroboramos que el code sea unico por cada producto
        if (code !== undefined && products[productIndex].code !== code) {
            const isUniqueCode = products.some(p => p.code === code);
            if (isUniqueCode) {
                throw new Error(`El código '${code}' ya está en uso por otro producto. No se aplicaron cambios.`)
            }
            products[productIndex].code = code;
        }
        // Modificamos el JSON, donde en este caso el unico objeto que va a surgir modificaciones es el que especificamos con su index
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
        return products;
    }

    // Funcion para borrar producto (buscando por su id)
    async deleteProduct(id){
        // Leemos el archivo JSON
        const products = await this.getProducts()
        // Definimos el index que va a tomar como valor el index dentro del array cuyo objeto tenga el campo id === al id ingresado
        const productIndex = products.findIndex(p => p.id === id)
        // Si productIndex devuelve -1 es porque no existe ese indice y no se encuentra el producto
        if(productIndex === -1){
            throw new Error('Producto no encontrado')
        }else{
            // Si se encuentra se borra el indice encontrado
            products.splice(productIndex, 1)
            return await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8')
        }
        
    }
}
// Instanciamos un objeto de la clase ProductManager
const productManager = new ProductManager('./productos.json')
// Exportamos el objeto para ser usado en otros archivos
export {productManager }