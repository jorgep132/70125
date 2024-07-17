console.log('Iniciando tarea')

setTimeout(() => {
    console.log('Ejecutando tarea')
}, 3000);

console.log('Finalizar tarea')
// En este programa se va a ver el siguiente orden
/*
Iniciando tarea
Finalizar tarea
Ejecutando tarea

Esto sucede por el timeout.
*/

