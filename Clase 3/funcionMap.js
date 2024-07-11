// Callbacks: MAP

function miFuncionMAP(arreglo, funcionCallBack){
    // La funcionCallBack es la funcion que recibe como parametro
    let nuevoArreglo = []
    for (let i = 0; i < arreglo.length; i++){
        const elemento = arreglo[i]

        let nuevoValor = funcionCallBack(elemento)
        nuevoArreglo.push(nuevoValor)
    }
    return nuevoArreglo
}

let valoresOriginales = [1,2,3,4,5]

let nuevosValores = miFuncionMAP(valoresOriginales, x => x+1)
                            // La funcionCallBack es anonima
console.log(valoresOriginales)
console.log(nuevosValores)

// Crear nuestro MAP
// No se utiliza casi nunca, es mas que nada conceptual
Array.prototype.miMap = function(funcionCallBack){
    let nuevoArreglo = []
    for (let i = 0; i < this.length; i++){
        const elemento = this[i]

        let nuevoValor = funcionCallBack(elemento)
        nuevoArreglo.push(nuevoValor)
    }
    return nuevoArreglo
}

let nuevoArreglo = valoresOriginales.miMap(x=>x+2)
console.log(nuevoArreglo)