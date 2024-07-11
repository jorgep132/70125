// Callbacks: MAPS

// Array con valores
let valoresOriginales = [1,2,5,6,4]

// Implementamos map, el cual ejecuta un callback.
let nuevosValores = valoresOriginales.map(x => x+1)
// La X toma el valor de cada elemento del array valoresOriginales
// Luego a ese valor le sumamos 1

// No modificamos el array original, creamos uno a partir de ese.
// Array original
console.log(valoresOriginales)
// Array modificado con maps
console.log(nuevosValores)

const funcionPar = (valor) =>{
    if(valor%2 === 0){
        return valor
    }else{
        return `No es par`
    }        
}

// Hacemos un nuevo map con una funcion como parametro, la cual es el callback.
// En este caso map creara un nuevo array aplicando la funcionPar, para determinar si
// los numeros del array original son pares o no.
let nuevosValoresPares = valoresOriginales.map(funcionPar)
console.log(nuevosValoresPares)