/*
Ejemplo de query
*/

// Importamos express
import express from 'express'

const app = express();
const PORT = 8080

app.use(express.urlencoded({extended:true}))

app.get('/queries', (req, res)=>{
    // Queries o consultas
    const queries = req.query
    // Enviamos esas queries
    res.send(queries)
})

app.listen(PORT, ()=>{
    console.log(`Servidor ejecutandose en ${PORT}`)
})
// Si vamos a queries (localhost:8080/queries) nos va a devolver un objeto vacio
// Las queries empiezan con ? luego el nombre de la query y luego =
// ?nombre=jorge asi seria una query
// localhost:8080/queries?nombre=jorge
// para agregar otra query usamos &
// localhost:8080/queries?nombre=jorge&apelido=pineiro (no hace falta otro ?)
