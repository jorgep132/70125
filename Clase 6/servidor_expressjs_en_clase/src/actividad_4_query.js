/*
- Dado un array de objetos de tipo usuario, hacemos un filtro por genero.
- La ruta raiz debe devolver todos los usuarios, vamos a colocer un query param con
?, indicando que queremos un genero especifico.
En caso de enviarlo sin query, debe devolver todos los usuarios.
*/

import express from 'express';

const app = express();
app.use(express.urlencoded({extended:true}))

const PORT = 8080;
const users = [
    {id: 1, name: 'Jorge', lastName: 'Pineiro', mail: 'jorge@test.com.ar', gender: 'M'},
    {id: 2, name: 'Agustina', lastName: 'Sumi', mail: 'sumi@test.com.ar', gender: 'F'},
    {id: 3, name: 'Nightmare', lastName: 'Tortoise', mail: 'tortoise@test', gender: 'F'},
    {id: 4, name: 'Esmeralda', lastName: 'Bebe', mail: 'miau@test', gender: 'F'},
    {id: 5, name: 'Apolo', lastName: 'Bulldog', mail: 'guau@test', gender: 'M'}
]

// Por params
app.get('/usuario_param/:gender', (req, res)=>{
    const genero = req.params.gender;
    if(!genero){
        return res.send({users});
    }
    if(genero.toUpperCase() !== 'M' && genero.toUpperCase() != 'F'){
        return res.send({users})
    }
    const filteredUsers = users.filter(users => users.gender === genero.toUpperCase())
    res.send({users: filteredUsers})
})

// Por query
app.get('/usuario_query', (req, res)=>{
    const genero = req.query.genero;
    if(!genero){
        return res.send({users});
    }
    if(genero.toUpperCase() !== 'M' && genero.toUpperCase() != 'F'){
        return res.send({users})
    }
    const filteredUsers = users.filter(users => users.gender === genero.toUpperCase())
    res.send({users: filteredUsers})
})

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en ${PORT}`)
})