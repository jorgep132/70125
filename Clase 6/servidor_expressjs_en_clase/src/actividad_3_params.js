/*
- Dado un arreglo de objetos de tipo usuario, realizar un servidor en express que permita
obtener dichos usuarios.
- La ruta raiz '/' debe devolver todos los usuarios.
- La ruta /:userId debe devolver solo al usuario con dicho id
*/

import express from 'express';

const app = express()
const usuarios = [
    {
        id: 1,
        nombre: 'Jorge',
        apellido: 'Pineiro',
        edad: 29
    },
    {
        id: 2,
        nombre: 'Esmeralda',
        apellido: 'Bebe',
        edad: 15
    },
    {
        id: 3,
        nombre: 'Corne',
        apellido: 'Maldo',
        edad: 28
    }
]
const PORT = 8080

app.get('/', (req, res)=>{
    // Se pone entre {} para que salga usuario : array.
    res.send({usuarios})
})

// Si usamos usuario/id vamos a obtener uno en particular
app.get('/usuario/:id', (req, res)=>{
    const userId = parseInt(req.params.id)
    const user = usuarios.find(usuario => usuario.id === userId)
    if(!user){
        // Con el return evitamos errores
        return res.send({error: 'Usuario no encontrado'})
    }
    res.send({user})
})
// Esto seria una API res

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en puerto ${PORT}`)
})