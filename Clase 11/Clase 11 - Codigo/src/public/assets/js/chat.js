// Test para ver que el script este bien vinculado
console.log('chat.js')

// Llamamos al socket
const socket = io()

// Variables
let user
let chatbox = document.querySelector('#chatbox')

// Login
Swal.fire({
    title: 'Login',
    input: 'text',
    text: 'Ingrese el usuario',
    inputValidator: value =>{
        return !value && 'Necesitas escribir tu usuario para continuar'
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value
    Swal.fire({
        title: `Bienvenido ${user}` 
    })    
})

// Trabajamos en el chatbox
// keyup registra cuando levanto la tecla
chatbox.addEventListener('keyup', evt =>{
    if(evt.key === 'Enter'){
        if(chatbox.value.trim().length > 0){
            socket.emit('message', {user, message: chatbox.value})
            chatbox.value = ''
        }
    }
}) 

socket.on('messageLogs', data => {
    // console.log('mensajes para todos', data)
    let log = document.querySelector('#messageLogs')
    let messages = ''
    data.forEach(message => {
        messages = messages + `${message.user} dice: ${message.message}<br>`
    })
    log.innerHTML = messages
})