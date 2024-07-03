/*
Consigna
Realizar una clase “ProductManager” que gestione un conjunto de productos. 

Aspectos a incluir

Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío. 
Cada producto que gestione debe contar con las propiedades: 
    title (nombre del producto)
    description (descripción del producto)
    price (precio)
    thumbnail (ruta de imagen)
    code (código identificador)
    stock (número de piezas disponibles)

Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.  
    Validar que no se repita el campo “code” y que todos los campos sean obligatorios 
    Al agregarlo, debe crearse con un id autoincrementable
Debe contar con un método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
Debe contar con un método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
    En caso de no coincidir ningún id, mostrar en consola un error “Not found”

*/

// Codigo principal
class ProductManager{
    constructor(){
        this.products = []
        this.nextId = 1
    }
    addProduct (title, description, price, thumbnail, code, stock){
        if (!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Todos los campos son obligatorios.')
            return
        }
        const uniqueCode = this.products.some(product => product.code === code)
        if (!uniqueCode){
            let product = {
                id: this.nextId++,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock    
            }
            this.products.push(product)
            return this.products
        }
    }
    getProducts (){
        return this.products;
    }
    getProductsById(id){
        let productsFound = this.products.find(product => product.id === id)
        if (productsFound){
            return productsFound
        }else{
            return `Not found`
        }
    }
}

// Testing 
const listaProductos = new ProductManager()

listaProductos.addProduct('Arroz blanco', 'Arroz blanco de calidad', 1200, 'Foto', 9032, 5);
listaProductos.addProduct('Fideos', 'Fideos largos', 800, 'Foto', 9033, 10);
listaProductos.addProduct('Leche', 'Leche entera', 1500, 'Foto', 9034, 3);
listaProductos.addProduct('Alfajor', 'Alfajor triple', 1100, 'Foto', 9032, 3);
listaProductos.addProduct('Alfajor', 'Alfajor triple', 1100, 'Foto', 3);

console.log(listaProductos.getProducts());

console.log(listaProductos.getProductsById(2))
console.log(listaProductos.getProductsById(30))
