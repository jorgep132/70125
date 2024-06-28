// Creacion de una clase contador

class Contador {
    constructor(responsable){
        this.responsable = responsable;
        this.conteo = 0;
        Contador.contadorGlobal++;
    }
    static contadorGlobal = 0;

    getResponsable = () => { 
        return this.responsable;
    };
    contar = () => {
        this.conteo++;
        Contador.contadorGlobal++;
    };
    getConteoIndividual = () => {
        return this.conteo;
    }
    getContadorGlobal = () => {
        return Contador.contadorGlobal;
    };
    
}

const julia = new Contador('Julia');
const pedro = new Contador('Pedro');+

pedro.contar();
pedro.contar();
pedro.contar();

console.log(`Pedro cuenta individual ${pedro.getConteoIndividual()} y global ${pedro.getContadorGlobal()}`);
console.log(`Julia cuenta individual ${julia.getConteoIndividual()} y global ${julia.getContadorGlobal()}`);

// El estado global va a seguir aumentando, el individual no porque empieza en 0.
