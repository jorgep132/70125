"use strict";
// Utilizamos el modulo fileSystem
const fs = require('fs');

// Al ejecutarse se crea el archivo ejemplo.txt en el mismo directorio 
// donde esta el programa (archivo js) con el contenido marcado.
// Escribimos un archivo txt con el contenido que queremos y el formato que usamos.
                //  Path             Contenido         Formato
fs.writeFileSync('./ejemplo.txt', 'Hola como estas?', 'utf-8')
if(fs.existsSync('./ejemplo.txt')){
    let contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    // Leemos el contenido
    console.log(contenido)
    // Agregamos mas contenido
    fs.appendFileSync('./ejemplo.txt', ' mas contenido!!', 'utf-8')
    contenido = fs.readFileSync('./ejemplo.txt', 'utf-8')
    console.log(contenido)
    // Borramos el archivo
    fs.unlinkSync('./ejemplo.txt')
}

