/*
Calculadora positiva con promesas

¿Cómo lo hacemos? Se crearán un conjunto de funciones gestionadas por promesas y un entorno
ASÍNCRONO donde podremos ponerlas a prueba
✓ Definir función suma:
    ○ Debe devolver una promesa que se resuelva siempre que ninguno de los dos sumandos
    sea 0
    ○ En caso de que algún sumando sea 0, rechazar la promesa indicando “Operación
    innecesaria”.
    ○ En caso de que la suma sea negativa, rechazar la promesa indicando “La calculadora sólo
    debe devolver valores positivos
✓ Definir función resta:
    ○ Debe devolver una promesa que se resuelva siempre que ninguno de los dos valores sea 0
    ○ En caso de que el minuendo o sustraendo sea 0, rechazar la promesa indicando
“Operación inválida
    ○ En caso de que el valor de la resta sea menor que 0, rechazar la promesa indicando “La
    calculadora sólo puede devolver valores positivos
Definir una función multiplicación:
    ○ Debe devolver una promesa que se resuelva siempre que ninguno de los dos factores
    sea negativo
    ○ Si el producto es negativo, rechazar la oferta indicando “La calculadora sólo puede
    devolver valores positivos
✓ Definir la misma función división utilizada en esta clase.
✓ Definir una función asíncrona “cálculos”, y realizar pruebas utilizando async/await y
try/catch
*/

const dividir = (dividendo, divisor) =>{
    // Declaramos la promesa. Por convencion usamos resolve y reject.
    return new Promise ((resolve, reject)=>{
        if(divisor === 0){
            reject(`No se puede dividir por 0`)
        }else{
            resolve(dividendo/divisor)
        }
    })
}

const sumar = async (num1, num2) =>{
    return new Promise ((resolve, reject)=>{
        if(num1 === 0 || num2 === 0){
            reject('Operacion innecesaria.')
        }
        if(num1+num2 < 0){
            reject('La calculadora solo debe devolver valores positivos.')
        }
        let resultado = num1 + num2
        resolve(resultado)
    })
}

const restar = async (num1, num2) =>{
    return new Promise ((resolve, reject)=>{
        if(num1 === 0 || num2 === 0){
            reject('Operacion innecesaria.')
        }
        if(num1-num2 < 0){
            reject('La calculadora solo debe devolver valores positivos.')
        }
        let resultado = num1 - num2
        resolve(resultado)
    })
}

const multiplicar = async (num1, num2) =>{
    return new Promise ((resolve, reject)=>{
        if(num1 < 0 || num2 < 0){
            reject('Operacion invalida.')
        }
        if(num1*num2 < 0){
            reject('La calculadora solo debe devolver valores positivos.')
        }
        let resultado = num1 * num2
        resolve(resultado)
    })
}

// operacion es el CallBack
const calculos = async (num1, num2, operacion) => {
    try{
        const resultado = await operacion(num1, num2)
        console.log(`El resultado de la operacion es: ${resultado}`)

    }catch(error){
        console.log('Error')
        console.log(error)
    }
}

calculos(10, 5, dividir)
calculos(10, 5, sumar)
calculos(10, 5, restar)
calculos(10, 5, multiplicar)