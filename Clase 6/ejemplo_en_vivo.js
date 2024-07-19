/*
Creamos un servidor web con el modulo nativo de nodejs "http". Setear respuesta que contenga
el mensaje "Mi primer hola mundo desde backend"
El servidor debe escuchar en el puerto 8080 (Correr con nodemon)
Probar desde el navegador
Hacer algun cambio en el codigo y corroborar que se reinicie automaticamente.
*/

// Usamos el modulo http
const http = require('http')

// Creamos un servidor
// Tenemos una funcion de callback con request y response
const server = http.createServer((req, res) =>{
    // Utilizamos .end que viene con node.
    // Damos una respuesta (response)
    res.end('Mi primer hola mundo desde backend')
})

// Donde escuchamos el servidor (el puerto).
// Podemos usar cualquier puerto, pero se tiene que tomar en cuenta siempre para acceder.
// Esto nos ayuda para saber que el servidor esta prendido y funcionando.
server.listen(8080, ()=>{
    console.log('Escuchando en puerto 8080.')
})
// Si desde un navegador vamos a localhost:8080 nos aparecer el mensaje de res.end
