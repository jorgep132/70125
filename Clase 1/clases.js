// Se utiliza la palabra reservada 'class'.
// Creacion y partes de una clase.

class nombreDeMiClase {
    constructor(parametrosDeCreacion){
        console.log('Nuevo objeto creado');
        this.variableInterna = 2;
    }
    // Se ejecuta cuando se instancia la clase.

    static variableEstatica = 4;
    /*
    La 'static' es una variable que se puede usar sin instanciar.
    No utilizamos el metodo constructor para definir esta variable.
    Por lo general, si tenemos variables 'static' no usamos el metodo constructor
    ya que no vamos a instanciar.
    */

    metodo1(){
        console.log('Soy un meotodo de la clase');
    }
    // El metodo es el comportamiento de la clase, son funciones de la clase
    
}

// Creamos un objeto de la clase
let instancia = new nombreDeMiClase();
// Este objeto va a contar con los metodos y con todo lo que fue definido dentro del constructor.


