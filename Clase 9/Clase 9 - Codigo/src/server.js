const express       = require('express')
const userRouter    = require('./routes/users.router.js')
const productRouter = require('./routes/products.router.js')
const logger        = require('morgan')
const { uploader }  = require('./utils/multer.js')
const handlebars    = require('express-handlebars')
const pruebasRouter = require('./routes/pruebas.router.js')
const viewsRouter = require('./routes/views.router.js')

const app = express()
const PORT = 8080
 // dirname()

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

app.listen(PORT, () => {
    console.log('escuchando en el puerto: ', PORT)
})