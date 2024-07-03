// Operador nullish ?? , puede usarse tanto el operador o el OR ||

let vari;

let valor1 = vari ?? 'Vino nula';
let valor2 = vari || 'Vino nula';

// console.log('Valor 1 es igual a: ' + valor1);
// console.log('Valor 2 es igual a: ' + valor2);

// Metodo y variables privados. Se representan con # delante.

class Persona{

    #mayorEdad = 18;

    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    obtenerNombre(){
        return this.name;
    }
    #metodoPrivado(){
        console.log('Metodo privado');
    }
    usoMetodoPrivado(){
        this.#metodoPrivado();
    }
}

const persona = new Persona('Luis', 25);
persona.usoMetodoPrivado();




