// Promesas - Async y Await

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
// Por convencion identamos el .then y el .catch
// Siempre que llamamos a la funcion tenemos que llamar al then y catch.
dividir(5,3)
    .then(resultado =>{
        console.log(resultado)
    })
    .catch(error =>{
        console.log(error)
    });
// No se puede retornar afuera
// Si algun then falla, lo tomara catch y lo resolvera.

// Aplicando Async y Await
const calculo = async () => {
    try{
        const resultado = await dividir(10,2)
        console.log(resultado)
    }catch (error){
        console.log(`Paso por el error`)
        console.log(error)
    }
}
calculo()