const express = require('express') // COMMON JS
// import express from 'express' // type: module

// Creamos el objeto para crear el sv
const app = express()

// Variable con puerto
const PORT = 8080

// Definimos middleware
// Estas lineas son para poder utilizar los json
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = []
// Inicio de Endpoints con diferentes metodos.
app.get('/api/users', (req, res)=>{
    res.send({data: users})
})

// La REQ es un objeto. Este tiene una propiedad llamada body.
app.post('/api/users', (req, res)=>{
    const {body} = req
    if(!body.email || !body.password){
        return res.status(400).send({status: 'error', error: 'falta data'})
    }
    users.push({id: users.length + 1, ...body})
    // Concatenamos metodos para agregar el status y lo que enviamos
    res.status(200).send({data: users})
})

app.put('/api/users', (req, res)=>{
    res.send('Editamos users')
})

app.delete('/api/users/:uid', (req, res)=>{
    const {uid} = req.params
    const userExists = users.some(user => user.id === Number(uid))
    if(!userExists){
        return res.status(404).send({status: "error", error: "user not found"})
    }
    const nuevaLista = users.filter(user => user.id !== Number(uid))
    res.send(nuevaLista)
})
// Fin de endpoints con diferentes metodos.

// Evento listen para que el server quede escuchando las requests
app.listen(PORT, ()=>{
    console.log(`Escuchando en ${PORT}`)
})