/*
Ejercicio en clase modulo nativo CRYPTO

¿Cómo lo hacemos? Se creará una clase “UsersManager” que permitirá guardar usuarios en
un atributo estático. El usuario se recibirá con una contraseña en string plano, y se deberá
guardar la contraseña hasheada con crypto. Utilizar el módulo nativo crypto.
El manager debe contar con los siguientes métodos:
✓ El método “Crear usuario” debe recibir un objeto con los campos:
    ○ Nombre
    ○ Apellido
    ○ Nombre de usuario
    ○ Contraseña
El método debe guardar un usuario en un atributo estático llamado “Usuarios”, recordando
que la contraseña debe estar hasheada por seguridad
Práctica de módulo nativo:

✓ El método “Mostrar Usuarios” imprimirá en consola todos los usuarios almacenados.
✓ El método “Validar Usuario” recibirá el nombre de usuario que quiero validar, seguido de la
contraseña, debe poder leer el json previamente generado con el arreglo de usuarios y hacer la
comparación de contraseñas, Si coinciden el usuario y la contraseña, devolver un mensaje
“Logueado”, caso contrario indicar error si el usuario no existe, o si la contraseña no coincide.
*/
// Require trae modulos

// En este caso utilizamos los nativos fs(file system)
const fs = require('fs')
// Modulo crypto
const crypto = require('crypto')

class UserManager{
    // El path es la ruta donde va a estar guardado el archivo de usuario
    constructor(path){
        this.path = path;
    }
    // Creamos la function asincrona
    async agregarUsuario(usuario){
        // Validacion de datos
        if(
        !usuario.nombre ||
        !usuario.apellido || 
        !usuario.password ||
        !usuario.nombreUsuario
        ){
            return console.log(`Todos los campos son obligatorios.`)
        }
        // Validamos que el usuario no existe antes de duplicarlo
        const usuarios = await this.obtenerUsuarios()
        // Verificamos si dentro de usuarios ya existe el usuario ingresado.
        const usuarioExistente = usuarios.find(u => u.nombreUsuario === usuario.nombreUsuario);
        // De existir se informa y no se duplica el registro en el JSON
        if (usuarioExistente) {
            return console.log(`El usuario ${usuario.nombreUsuario} ya existe.`);
        }
        // Desestructuramos, siendo todo lo que va a contener el objeto usuario.
        const {nombre, apellido, password, nombreUsuario} = usuario
        const hashedPassword = await this.hashearPassword(password)
        const nuevoUsuario = {
            nombre,
            apellido,
            // Directamente guardamos la password que ingreso el usuario pero hasheada
            password: hashedPassword,
            nombreUsuario
        }
        usuarios.push(nuevoUsuario)
        // Escribimos el archivo, donde pasamos el path que ya definimos y tambien le pasamos usuarios
        // Usuarios tiene que ser como string por lo que se convierte en string con stringify
        // Por ultimo el formato utf-8 con elq ue trabajamos antes
        // Agregamos en stringify(value, replacer, space)
        // Al usar null se agrega cada priopiedad del objeto sin borra nada
        // 2 Es el numero de espacio de identacion
        await fs.promises.writeFile(this.path, JSON.stringify(usuarios, null, 2), 'utf-8')
    }
    // Funcion asincrona
    async obtenerUsuarios(){
        // Bloque try & catch
        try{
            // Definimos el path del archivo y el formato.
            // utf-8 es el sistema de caracteres que usamos en latinoamerica.
            // El await espera a la funcion readFile para leer el archivo
            const resultado = await fs.promises.readFile(this.path, 'utf-8')
            // Una vez se completo el await, se va a convertir el archivo en JSON
            const usuarios = JSON.parse(resultado)
            return usuarios
        }
        catch (error){
            return[]
        }   
    }
    async hashearPassword(password){
        // Utilizamos crypto para crear un hash, que quiere decir encriptar la password para ocultar la original
        // sha256 es uno de los formatos usados para hashear
        const hash = crypto.createHash('sha256')
        hash.update(password)
        // Queremos que la password sea hexadecimal
        const hashedPassword = hash.digest('hex')
        return hashedPassword
    }
    async validarUsuario(nombreUsuario, password){
        const users = await this.obtenerUsuarios()
        // Comparamos y buscamos el usuario, el cual tiene que ser exactamente igual (===)
        const user = users.find(u => u.nombreUsuario === nombreUsuario)
        if(!user){
            return console.log(`El usuario ${nombreUsuario} no existe.`)
        }else{
            // Verificamos si la pass coincide con la de la database
            const dbPassword = user.password
            // Tenemos que hashear la password
            const hashedPassword = await this.hashearPassword(password)
            if(dbPassword === hashedPassword){
                console.log(`Bienvenido ${nombreUsuario}`)
            }else{
                console.log(`Contraseña incorrecta.`)
            }
        }
    }
}

const test = async () => {
    // Instanciamos la clase UserManager y elegimos el path
    const userManager = new UserManager('./user.json')
    await userManager.agregarUsuario({
        nombre: 'Jorge',
        apellido: 'Pineiro',
        password: 'esmeralda',
        nombreUsuario: 'JorgeP'
    })
    await userManager.agregarUsuario({
        nombre: 'Matias',
        apellido: 'Volpian',
        password: '123456',
        nombreUsuario: 'Ma7e'
    })
    await userManager.agregarUsuario({
        nombre: 'Mauricio',
        apellido: 'Salvagno',
        password: 'pachu',
        nombreUsuario: 'Drackon'
    })

    await userManager.validarUsuario('JorgeP', 'esmeralda')
    await userManager.validarUsuario('Ma7e', 'Corne')
}
// Ejecutamos la funcion test para probar y luego se creara el archivo JSOn
test()