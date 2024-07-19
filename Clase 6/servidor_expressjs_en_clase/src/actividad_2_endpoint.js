/*
Crear un proyecto basado en express js, el cual cuente con un servidor que escuche
en el puerto 8080.
Se deben configurar los siguientes endpoints:
- Endpoint del metodo GET a la ruta '/bienvenida' debe devolver un html con letras en
color azul, en un string, dando la bienvenida.
- Endpoint metodo GET a la ruta '/usuario' debe devolver un objeto con los datos de 
un usuario falso: {nombre, apellido, edad, correo}
*/

// Importamos express
import express from 'express';

// Creamos la app con express
const app = express()

// Creamos el endpoint para bienvenida
app.get('/bienvenida', (req, res) =>{
    // Enviamos el response con formato y color
    res.send(`<h1 style="color: blue">Bienvenido al sitio</h1>`)
})

// Creamos el endpoit para usuario.
app.get('/usuario', (req, res)=>{
    // Objeto usuario
    const usuario = {
        nombre: 'Jorge',
        apellido: 'Pineiro',
        edad: 29,
        email: 'jorge@test.com.ar'
    }
    // Le enviamos el usuario
    res.send({usuario})
})

const port = 8080
app.listen(port, ()=>{
    console.log(`Servidor en puerto ${port}`)
})