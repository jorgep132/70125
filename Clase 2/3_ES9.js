const persona1 = {
    nombre: 'Pedro',
    apellido: 'Lopez',
    edad: 28
};

const persona2 = {
    nombre: 'Lucia',
    apellido: 'Perez',
    edad: 27
};

// Spread destructuring
// Le asigna automaticamente el nombre y apellido del objeto, ya que coincide con la key.
let {nombre, apellido} = persona2;
console.log(nombre, apellido);

/* Rest 
let persona3 = persona1;
No se copia el objeto, sino la referencia, modificando tambien persona1.
Para corregir eso se debe usar el rest: {...objeto} */
let persona3 = {...persona1}
persona3.nombre = 'Luis';
console.log(persona1.nombre);
console.log(persona3.nombre);

