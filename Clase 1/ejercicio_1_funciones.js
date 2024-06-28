// Funciones
// Definir la funciona mostrarLista que va a recibir un array
// Si la lista esta vacia, devuelve un mensaje avisando que esta vacia.
// Si la lista cuenta con elementos, los muestra 1x1 en consola, finaliza el proceso devolviendo su longitud (usar template string ``)
// Invocar la funcion con los casos de prueba.

const mostrarLista = (lista) => {

    lista.forEach(elemento => console.log(elemento));
    let cantElementos = lista.length;

    if (cantElementos === 0)
    {
        console.log('Lista vacia');
    } else {
        console.log( `El largo de la lista es: ${cantElementos}`);
    };
};

let lista1 = [1,2,5,88];
let lista2 = [21,52,85,82];
let lista3 = [];

mostrarLista(lista1);
mostrarLista(lista2);
mostrarLista(lista3);


