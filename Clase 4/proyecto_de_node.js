/*
Actividad en clase:
Crear un proyecto de node que genere 10000 números aleatorios en un rango de 1 a
20.
Indicar por consola la finalización de esta operación con un mensaje.
✓ Mediante el uso de Promesas, crear un objeto cuyas claves sean los números salidos y
el valor asociado a cada clave será la cantidad de veces que salió dicho número.
Representar por consola los resultados.
Nota: Considerar que esta operación debe realizarse de forma asíncrona.
*/

// Creamos la funcion flecha
const generarNumeroAleatorio = (cantidad) =>{
    const numeros = []
    // Creamos un for que va a funcionar mientras i < cantidad ingresada
    for(let i=0; i<cantidad; i++){
        // Lo que hace math.floor es redondear el numero hasta el entero mas cercando, redondeando hacia abajo.
        // Lo que hace math.random es buscar numeros entre 0 y 1, al multiplicarlo por 20 buscara entre
        // 0 y 19 pero al sumarle 1 buscara entre 1 y 20.
        // Entonces si nos diera 19.9999 el floor lo redondea a 19, dejando que la aleatoriedad sea siempre
        // Entre enteros de 1 a 20
        const numeroAleatorio = Math.floor(Math.random()*20)+1;
        numeros.push(numeroAleatorio)
    }
    return numeros;
}

function contarFrecuenciaNumero(numeros){
    // Creamos una nueva promesa
    return new Promise((resolve, reject)=>{
        // Vamos a ver con que frecuencia se repite el numero
        const frecuencia = {};
        // Recorremos todos los numeros de numeros
        for(const numero of numeros){
            if(frecuencia[numero]){
                frecuencia[numero]++;
            }else{
                frecuencia[numero] = 1;
            }
        }
        resolve(frecuencia)
    })
}

// El ejercicio nos pide 10000
const cantidadNumerosAleatorios = 10000;

// Podemos enviar directamente 10000 pero lo guardamos en una variable que se pasa como parametro para la funcion
const numeros = generarNumeroAleatorio(cantidadNumerosAleatorios)
// Aca vamos a mostrar el objeto numeros con su frecuencia
console.log(`Los numeros generados aleatoriamente son: `)

// Llamamos a la funcion para que muestre un objeto con los numeros que salieron y cuantas veces salio cada uno
contarFrecuenciaNumero(numeros)
    .then(result =>{
    console.log(result)
})