// Ejemplo en vivo

class Persona{
    constructor(name, lastName){
        this.name = name;
        this.lastName = lastName;
    }
    static especie = 'humano';

    saludar = () => {
        console.log(`Hola soy ${this.name}, mucho gusto.`);
    }
    getName = () => {
        console.log(`Me llamo ${this.name} ${this.lastName}.`);
    }

    despedir = () => {
        console.log(`Chau, nos vemos.`);
    }
}

const juan = new Persona ('Juan', 'Bida');
const lucia = new Persona ('Lucia', 'Martinez');

juan.getName();
lucia.getName();

// Esto se va a mostrar porque es static, no hace falta
console.log(Persona.especie);