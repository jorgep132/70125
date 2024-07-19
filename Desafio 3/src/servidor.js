// Importamos express
import express from 'express';

// Definimos la const app para usar express()
const app = express();
// Puerto que usaremos
const PORT = 8080;

// Servidor
function exportGet(productManager){
    app.get('/products', async (req, res) =>{
        const products = await productManager.getProducts()
        res.send(`Lista de productos ${JSON.stringify(products, null, 2)}`)
    })
}

function exportParams(productManager){
    app.get('/products/:id', async (req, res)=>{
        const id = parseInt(req.params.id)
        const products = await productManager.getProductById(id)
        res.send(`Lista de productos ${JSON.stringify(products, null, 2)}`)
    })
}

function exportListen(){
    app.listen(PORT, ()=>{
        console.log(`Servidor ejecutandose en puerto ${PORT}`)
    })
}

export { exportGet, exportListen, exportParams }