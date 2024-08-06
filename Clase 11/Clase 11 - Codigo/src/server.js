const express       = require('express')
const { uploader }  = require('./utils/multer.js')
const handlebars    = require('express-handlebars')
const viewsRouter   = require('./routes/views.router.js')
const { Server }    = require('socket.io')

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/static', express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public'))

app.use(function(req, res, next ){
    console.log('Time: ', Date.now())
    next()
})

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use('/', viewsRouter)

app.use((error, req, res, next) => {
    console.log(error.stack)
    res.status(500).send('error de server')
})

const httpServer = app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})
// Por convencion se llama io
const io = new Server(httpServer)
// Vamos a guardar los mensajes en memoria
let messages = []
io.on('connection', socket =>{
    console.log('Nuevo cliente conectado.')

    socket.on('message', data =>{
        console.log(data)
        messages.push(data)
        io.emit('messageLogs', messages)
    })
})
