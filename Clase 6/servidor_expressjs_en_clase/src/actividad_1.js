/*
Ejemplo de consulta en express.
- Estructurar un servidor basado en express, el cual escuche peticiones en el puerto 8080.
- Realizar una funcion para el metodo GET en la ruta '/saludo', el cual respondera con
"Hola a todos, pero ahora desde express."
- Eejecutar con nodemon y probar en el navegador el endpoint generado.
*/

// Importamos express
import express from 'express';

// Creamos una app con la funcion express.
const app = express()

// El metodo .get define si obtenemos desde cierta ruta un parametro
// GET se utiliza para obtener informacion.
// En este caso desde localhost:8080/saludo vamos a obtener (get) info
// Siempre va a tener un callback con req y res
app.get('/saludo', (req, res)=>{
    // Enviar la respuesta
    res.send('Hola como estan?')
});

// Definimos el puerto de donde se escucha, siempre lleva una funcion callback
app.listen(8080, ()=>{
    console.log('Servidor en puerto 8080')
})
