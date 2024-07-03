/*
Registrador de tickets de eventos
Definir clase TicketManager, el cual tendrá un arreglo de eventos que iniciará vacío
✓ La clase debe contar con una variable privada “precioBaseDeGanancia”, la cual añadirá un
costo adicional al precio de cada evento.
✓ Debe contar con el método “getEventos” El cual mostrará los eventos guardados.
✓ Debe contar con el método “agregarEvento” El cual recibirá los siguientes parámetros:
    ○ nombre
    ○ lugar
    ○ precio (deberá agregarse un 0.15 del valor original)
    ○ capacidad (50 por defecto)
    ○ fecha (hoy por defecto)
El método deberá crear además el campo id autoincrementable y el campo “participantes”
que siempre iniciará con un arreglo vacío.
Debe contar con un método “agregarUsuario” El cual recibirá:
    ○ id del evento (debe existir, agregar validaciones)
    ○ id del usuario
El método debe evaluar que el evento exista y que el usuario no haya estado registrado
previamente (validación de fecha y capacidad se evitará para no alargar el reto)
Si todo está en orden, debe agregar el id del usuario en el arreglo “participantes” de ese
evento.
✓ Debe contar con un método “ponerEventoEnGira” El cual recibirá:
    ○ id del evento
    ○ nueva localidad
    ○ nueva fecha
El método debe copiar el evento existente, con una nueva localidad, nueva fecha, nuevo id y
sus participantes vacíos (Usar spread operator para el resto de las propiedades)
*/

class TicketManager {
    #precioBaseDeGanancia = 1.15;

    constructor(){
        this.eventos = [];
    }
    getEventos(){
        return this.eventos;
    }
    agregarEvento(nombre, lugar, precio){
        let id_evento = this.eventos.length;
        let evento = {
            nombre: nombre,
            lugar: lugar,
            precio: precio * this.#precioBaseDeGanancia,
            capacidad: 50,
            fecha: Date(),
            participantes: [],
            id: ++id_evento
        }
        this.eventos.push(evento);
        return this.eventos;
    }
    traerEvento(idEvento){
        let evento = this.eventos.find(elemento => elemento.id == idEvento);
        if(evento){
            return evento
        }else{
            return null
        }
    }
    agregarUsuario(id_evento, id_usuario){
        const evento = this.traerEvento(id_evento)
        if(evento == null){
            return ['El evento no existe']
        }
        if(this.estaRegistrado(id_evento, id_usuario)){
            evento.participantes.push(id_usuario)
        } else {
            return ['La persona ya esta registrada']
        }
    }
    estaRegistrado(id_evento, id_usuario){
        let evento = this.traerEvento(id_evento)
        let registro  = evento.participantes.find(idParticipante => idParticipante == id_usuario)
        if(registro === undefined){
            return true
        }else{
            return fasle
        }
    }
    ponerEventoEnGira(id_evento, nLocalidad, nFecha){
        let evento = this.traerEvento(id_evento)
        let id_NewEvento = this.eventos.length
        if(!evento){
            return ['El evento no existe']
        }
        let nuevoEvento = {...evento}
        nuevoEvento.lugar = nLocalidad
        nuevoEvento.fecha = nFecha
        nuevoEvento.id = ++id_NewEvento
        this.eventos.push(nuevoEvento)

        return this.eventos
    }
}

const ticketManager = new TicketManager()

ticketManager.agregarEvento('Baradero Rock', 'Baradero', 1500)
ticketManager.agregarEvento('San Pedro Rock', 'San Pedro', 2500)

ticketManager.agregarUsuario(1,1)
ticketManager.agregarUsuario(1,2)
ticketManager.ponerEventoEnGira(2, 'Ramallo', '11-12-2024')


console.log(ticketManager.getEventos())
