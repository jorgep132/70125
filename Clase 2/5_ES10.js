// String trim

const texto = '           Texto ejemplo            ';

let procesado = '';

procesado = texto.trim(); // -> 'Texto ejemplo' lo mostrara sin espacios.
procesado = texto.trimStart(); // -> 'Texto ejemplo      ' solo limpia el comienzo.
procesado = texto.trimEnd(); // -> '         Texto ejemplo' solo limpia el final.

// Array flat

const arr = [1, [2,4], 'g', [4,5,5],5];
console.log(arr);
console.log(arr.flat()); // En vez de tener varios array, muestra solo los elementos.
// Si tenemos un array interno con otro array interno no lo va a tomar, va a devolver undefined
// No se suele utilizar.


