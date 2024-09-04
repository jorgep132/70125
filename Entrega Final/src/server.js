const express = require('express');
const handlebars = require('express-handlebars');
const appRouter = require('./router/index.js');
const { connectDB } = require('./config/index.js');
const { Server } = require('socket.io');
const realTimeProducts = require('./router/api/realTimeProducts.router.js');
const { setupSocketEvents } = require('./socketEvents.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
connectDB();

// Plantillas
const hbs = handlebars.create({
    helpers: {
        multiply: (a, b) => a * b,
        eq: (a, b) => a === b
    }
});
app.engine('handlebars', hbs.engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// Routers
app.use(appRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${PORT}`);
});
const io = new Server(httpServer);

// Eventos de Socket.IO
setupSocketEvents(io);