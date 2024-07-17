const fs = require('fs')

class UsersManager {
    constructor(path){
        this.path = path
    }
    async crearUsuario(usuario){
        if(!usuario.nombre || !usuario.apellido || !usuario.edad || !usuario.curso){
            return console.error(`Todos los campos son obligatarios.`)
        }
        const nuevoUsuario = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            edad: usuario.edad,
            curso: usuario.curso
        }
        const usuarios = await this.obtenerUsuarios()
        usuarios.push(nuevoUsuario)
        await fs.promises.writeFile(this.path, JSON.stringify(usuarios, null, 2), 'utf-8')
    }
    async obtenerUsuarios(){
        try {
            const result = await fs.promises.readFile(this.path, 'utf-8')
            const users = JSON.parse(result)
            return users
        } catch (error) {
            return []
        }
    }
}

const test = async () => {
    const userManager = new UsersManager('.usuarios.json')
    await userManager.crearUsuario({
        nombre: 'Fernando',
        apellido: 'Giraudo',
        edad: 33,
        curso: 'Backend'
    })
    const users = await userManager.obtenerUsuarios()
    console.log(users)
}

test()