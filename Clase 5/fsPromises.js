const fs = require('fs')

const operacionesAsincronas = async (path) => {
    await fs.promises.writeFile(path, 'Hola desde promises', 'utf-8')
    let resultado = await fs.promises.readFile('./fsPromises.txt', 'utf-8')
    console.log(resultado)
    await fs.promises.appendFile(path, ' Mas data!', 'utf-8')
    resultado = await fs.promises.readFile(path, 'utf-8')
    console.log(resultado)
}

operacionesAsincronas('./fsPromises.txt')
// Creamos un archivo package.json:
// npm init -y

