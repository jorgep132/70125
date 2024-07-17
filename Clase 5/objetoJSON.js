const fs = require('fs')

const leerPackageJSON = async (path, formato) => {
    try {
        const contenido = await fs.promises.readFile(path, formato)
        // Convertimos el string en JSON
        const contObj = JSON.parse(contenido)
        // Averiguamos el tamaño del JSON
        const stats = await fs.promises.stat(path)
        const info = {
            contenidoStr: contenido,
            contenidoObj: contObj,
            size: stats.size
        }
        await fs.promises.writeFile('./info.json', JSON.stringify(info), formato)
        console.log(info)
    } catch (error) {
        console.log(error)
    }
}

leerPackageJSON('./package.json', 'utf-8')