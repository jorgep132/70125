// Callbacks: calculadora

const sumar = (n1, n2) => n1+n2
const restar = (n1, n2) => n1-n2
const multiplicar = (n1, n2) => n1*n2
const dividir = (n1, n2) => n1/n2

// Va a recibir 3 parametros, n1, n2 y callback.
// Por convencion el Callback va a ir al final
const realizarOperacion = (n1, n2, funcionCallBack) =>{
    console.log(`Realizo la operacion que recibo.`)
    let resultado = funcionCallBack(n1,n2)
    console.log(`El resultado de la operacion enviada es: ${resultado}`)
}

realizarOperacion(22, 15, sumar)
realizarOperacion(22, 15, dividir)