// definimos socket
const socket = io();

// Variables
const agregarProducto = document.querySelector('#agregar');
const productoTitle = document.querySelector('#title');
const productDescription = document.querySelector('#description');
const productCode = document.querySelector('#code');
const productPrice = document.querySelector('#price');
const productStatus = document.querySelector('#status');
const productStock = document.querySelector('#stock');
const productCategory = document.querySelector('#category');
const productThumbnails = document.querySelector('#thumbnails');

// Evento para mostrar los productos
socket.on('products', products => {
    // Seleccionamos el div 'product-list' donde se agregaran los productos de manera dinamica
    const productContainer = document.querySelector('#product-list');
    productContainer.innerHTML = '';

    // Por cada producto vamos a crear los campos que iran dentro del div
    // Esos campos se van a llenar con los valores que contiene cada objeto 'product'
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h2>Titulo: ${product.title}</h2>
            <h2>Descripcion: ${product.description}</h2>
            <h2>Codigo: ${product.code}</h2>
            <h2>Precio: ${product.price}</h2>
            <h2>Estado: ${product.status ? 'Verdadero' : 'Falso'}</h2>
            <h2>Stock: ${product.stock}</h2>
            <h2>Category: ${product.category}</h2>
            <img src="${product.thumbnails}" class="foto_producto">
            <button type='button' class='delete' data-id='${product.id}'>Eliminar</button>
        `;
        // Agregamos el div que creamos dentro del div 'product-list'
        productContainer.appendChild(productDiv);
    });

    // Borrar producto
    // Seleccionamos los botones de clase .delete ya que vamos a tener 1 boton por cada producto
    const deleteButtons = document.querySelectorAll('.delete');
    // Cada boton tendra un evento 'click' que al clickear se generara la eliminacion del producto
    // Se va a llamar a la funcion productManager.deleteProduct dandole el parametro del id del producto, del lado del servidor
    deleteButtons.forEach(button => {
        button.addEventListener('click', async evt => {
            // Usamos un sweetalert para confirmar que el cliente quiera borrar el producto
            Swal.fire({
                title: "Esta accion borrara el producto de manera permanente",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Borrar el producto.",
                cancelButtonText: "Cancelar"
              }).then((result) => {
                    // Si acepta borrar el producto
                    if (result.isConfirmed) {
                    // Tomamos el atributo de id del producto que luego usara nuestra funcion 
                    const productId = evt.target.getAttribute('data-id');
                    // Convertimos el id en number ya que la funcion productManager.deleteProduct toma un number
                    const parsedProductId = parseInt(productId);
                    // Emitimos el evento eliminar producto, brindando como data el id parseado
                    socket.emit('eliminar_producto', parsedProductId);
                    // Notificamos que se borro correctamente
                    Swal.fire({
                        title: "Producto eliminado",
                        icon: "success"
                        });
                    }else{
                    // Si el cliente no quiera vanzar con la eliminacion del producto
                    Swal.fire({
                        title: "Operacion cancelada",
                        confirmButtonText: 'Volver'
                    });
                }
            });
        });
     });
});

// Evento para agregar un producto
agregarProducto.addEventListener('click', async evt => {
    // Prevenimos el default para que no se refresque la pagina sola
    evt.preventDefault();
    // Tomamos el primer archivo que subimos
    const file = productThumbnails.files[0];
    let thumbnailPath = '';

    try {
        if (file) {
            // Si se sube una rchivo llamamos la funcion uploadPhoto, dandole ese file como parametro
            thumbnailPath = await uploadPhoto(file);
        }
        const product = {
            title: productoTitle.value,
            description: productDescription.value,
            code: productCode.value,
            price: productPrice.value,
            status: productStatus.value,
            stock: productStock.value,
            category: productCategory.value,
            thumbnails: thumbnailPath
        };
        // Emitimos el evento para agregar producto, donde la data sera un objeto product
        socket.emit('agregar_producto', product);
        } catch (error) {
        // Si hay error emitimos un mensaje de error a traves de Toastify
        socket.emit('product_error', err.message)
    }
});

// Función para subir la foto
const uploadPhoto = async (file) => {
    // Creamos un form para enviar el archivo
   const formData = new FormData();
   formData.append('thumbnails', file);

   // Usamos fetch para poder utilizar el metodo post y traer el body desde la URL actual sin tener que ir al path
   // donde se sube la foto
   const response = await fetch('/api/upload-photo', {
       method: 'POST',
       body: formData
   });
   // Manejamos el error
   if (!response.ok) {
       throw new Error('Error al subir la foto');
   }
   const data = await response.json();
   return data.filePath;
};

// Alerts
// Evento para informar errores al intentar cargar el producto
socket.on('product_error', errorMessage => {
    // Usamos Toastify para enviar el alert
    Toastify({
        text: errorMessage,
        duration: 1000
    }).showToast();
});
// Evento para informar errores al intentar borrar el producto
socket.on('products_delete_error', errorMessage => {
    // Usamos toastify para enviar el alert
    Toastify({
        text: errorMessage,
        duration: 1000
    }).showToast();
});
// Evento para informar que el producto se agrego con exito
socket.on('product_added_ok', () => {
    // Usamos toastify para el alert
   Toastify({
      text: 'Producto agregado con exito',
      duration: 1000
   }).showToast()
})
