/*
Dados los objetos:
1. Realizar una lista nueva que contenga todos los tipos de productos, no cantidades.
2. Obtener el total de productos vendidos por todos los objetos.
*/

const objetos = [
    {
        manzanas: 3,
        peras:2,
        carne: 1,
        jugos:5,
        dulces:2
    },
    {
        manzanas: 1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    }
]

const productos = [];
objetos.forEach(elemento => {
    productos.push(...Object.keys(elemento))
});

const productosUnicos = productos.reduce((acc, item)=>{ // acc(acumulador) -> array
    if(!acc.includes(item)){
        acc.push(item);
    }
    return acc;
}, []);

console.log(productosUnicos);


const cantProductos = [];
objetos.forEach(elemento =>{
    cantProductos.push(...Object.values(elemento))
});

const totalProductos = cantProductos.reduce( (acc,valor) => { return acc + valor}, 0);
console.log(totalProductos);
