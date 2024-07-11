/*
Ejercicio en clase:
Calculadora de edad
Realizar un programa que utilice la dependencia momentjs
(deberá instalarse por npm install).
✓ Debe contar con una variable que almacene la fecha
actual (utilizar moment())
✓ Debe contar con una variable que almacene sólo la fecha
de tu nacimiento (utilizar moment).
✓ Validar con un if que la variable contenga una fecha
válida (utilizar el método isValid());
✓ Finalmente, mostrar por consola cuántos días han
pasado desde que naciste hasta el día de hoy. (utilizar el
método diff()
✓ Extra: Cambia tu moment a la versión 1.6.0, al no ser la
misma versión mayor, nota el cambio al correr el
programa.
*/
// Instalamos y usamos el modulo luxon
const {DateTime} = require('luxon')

// Tomamos la fecha actual
const fechaHoy = DateTime.now()

// Indicamos la fecha de nacimiento
const fechaNac = DateTime.fromISO('1994-10-11')
if(fechaHoy.isValid && fechaNac.isValid){
    const days = fechaHoy.diff(fechaNac).as('days')
    const daysRounded = Math.floor(days)
    console.log(`Han pasado ${daysRounded} dias desde mi nacimiento.`)
}