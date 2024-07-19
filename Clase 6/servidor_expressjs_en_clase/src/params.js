// Objeto req.params

import express from 'express';

const app = express();
const PORT = 8080

// Nombre es un parametro, ya que tiene : antes. Es como una variable que tendra cualquier valor.
// Cuando querramos entrar a la web debemos poner /usuario/jorge (puede ser cualquier nombre)
app.get('/usuario/:nombre', (req, res)=>{
    // Lo identifica directamente.
    console.log(req.params.nombre)
    // En el response usamos el nombre para dar la bienvenida
    res.send(`Bienvenido ${req.params.nombre}`)
})

app.listen(PORT, ()=>{
    console.log(`Servidor en puerto ${PORT}.`)
})

