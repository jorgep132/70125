// fileSystem con Callback

// Utilizamos el modulo fs
const fs = require('fs')

                // Archivo              Contenido            Callback
fs.writeFile('./ejemploCallback.txt', 'Hola desde callback', (error) =>{
    if(error) return console.log('No se pudo escribir el archivo.')
        //          Archivo               Formato     Funcion
    fs.readFile('./ejemploCallback.txt', 'utf-8', (error, resultado) =>{
        if(error) return console.log('No se pudo leer el archivo.')
        console.log(resultado)
        fs.appendFile('./ejemploCallback.txt', ' mas contenido', (error => {
            if(error) return console.log('No se pudo actualizar el archivo')
            fs.readFile('./ejemploCallback.txt', 'utf-8', (error, contenido)=>{
                if(error) return console.log(error)
                console.log(contenido)
            })
        }))

    })
        
})
// Esto genera un callback hell, lo cual es una mala practica.