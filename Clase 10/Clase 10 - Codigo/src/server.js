const express       = require('express')
const userRouter    = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const logger        = require('morgan')
const { uploader }  = require('./utils/multer.js')
const handlebars    = require('express-handlebars')
const pruebasRouter = require('./routes/pruebas.router.js')
const viewsRouter   = require('./routes/views.router.js')
// Importamos websocket
// Extraemos Server
const { Server }    = require('socket.io') 
const app = express()
const PORT = 8080
// Configuramos el Server de socket que extrajimos de la libreria
// Primero lo guardamos en una const porque luego se va a configurar
const httpSever = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})
// Configuramos el sv socket a partir de nuestro sv
// Instanciamos un objeto de la clase Server usando nuestro server definido antes
const socketServer = new Server(httpSever)
// Ponemos en escucha el sv socket
// El evento connection se toma por defautl
socketServer.on('connection', (socket)=>{
    console.log('Nuevo cliente conectado')
    // Inventamos un evento de nombre message
    socket.on('message', data =>{
        console.log(data)
    })
    socket.emit('evento_para_un_socket_individual', 'este mensaje')

    socket.broadcast.emit('evento_para_todos_menos_para_el_socket_actual', 'Este evento lo veran todos los sockets conectados, menos el socket actual que envio el mensaje')

    socketServer.emit('mensaje_para_todos', 'Este mensaje lo reciben todos los clientes.')
})




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname + '/public'))
app.use(logger('dev'))

app.use(function(req, res, next ){
    console.log('Time: ', Date.now())
    next()
})

// endpoint
// configuracion del motor de plantillas
// usamos el metodo engine
app.engine('handlebars', handlebars.engine())
// configuramos la carpeta donde debe tomar las plantillas
app.set('views', __dirname + '/views')
// configuramos la extension
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/pruebas', pruebasRouter)
app.post('/', uploader.single('myFile'), (req, res)=>{
    res.send('archivo subido')
})
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})

// Configuramos el Server de socket que extrajimos de la libreria
// app.listen(PORT, () => {
//     console.log('escuchando en el puerto: ', PORT)
// })