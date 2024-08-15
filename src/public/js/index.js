//Solo javascripts para el cliente
const socket = io()

socket.on("productListServer", products => {
    // Obtener el contenedor donde se mostrarán los productos
    let contenedorProductos = document.querySelector("#product-list");

    products.forEach(function (producto) {
        let divProducto = document.createElement('div');
        divProducto.classList.add('productosHome');

        let idProducto = document.createElement('p');
        idProducto.textContent = `Id: ${producto.id}`;

        let nombreProducto = document.createElement('p');
        nombreProducto.textContent = `Titulo: ${producto.title}`;

        let descripcionProducto = document.createElement('p');
        descripcionProducto.textContent = `Descripcion: ${producto.description}`;

        let codeProducto = document.createElement('p');
        codeProducto.textContent = `Codigo: ${producto.code}`;

        let precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: $${producto.price}`;

        let statusProducto = document.createElement('p');
        statusProducto.textContent = `Status: ${producto.status}`;

        let stockProducto = document.createElement('p');
        stockProducto.textContent = `Stock: ${producto.stock}`;

        let categoryProducto = document.createElement('p');
        categoryProducto.textContent = `Categoria: ${producto.category}`;

        let thumbnailsProducto = document.createElement('p');
        thumbnailsProducto.textContent = `Imagen: ${producto.thumbnails}`;

        let buttonProduct = document.createElement("button")
        buttonProduct.textContent = "Eliminar"
        buttonProduct.classList.add(`borrarBtn${producto.id}`);
        buttonProduct.onclick = function () {
            // Aquí puedes hacer lo que necesites cuando se haga clic en el botón
            console.log(`Se hizo clic en el botón con ID ${producto.id}`);
            borrarProducto(producto.id)
            // Por ejemplo, podrías llamar a una función para manejar la eliminación del producto
            // deleteProduct(producto.id);
        };

        // Agregar los elementos al contenedor del producto
        divProducto.appendChild(idProducto);
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(descripcionProducto);
        divProducto.appendChild(precioProducto);
        divProducto.appendChild(codeProducto);
        divProducto.appendChild(statusProducto);
        divProducto.appendChild(stockProducto);
        divProducto.appendChild(categoryProducto);
        divProducto.appendChild(thumbnailsProducto);
        divProducto.appendChild(buttonProduct)



        // Agregar el producto al contenedor principal
        contenedorProductos.appendChild(divProducto);
    });
})


let agregarProducto = document.querySelector("#FormularioProduct")
agregarProducto.addEventListener("submit", (e) => {
    e.preventDefault()
    let info = {
        title: document.querySelector("#title").value,
        description: document.querySelector("#description").value,
        code: document.querySelector("#code").value,
        price: document.querySelector("#price").value,
        status: document.querySelector("#status").value,
        stock: document.querySelector("#stock").value,
        category: document.querySelector("#category").value
        /* thumbnails: "" */
    }
    try {
        if (Object.values(info).some(value => value === "")) {
            console.log("algunos datos estan vacios")
        } else {
            socket.emit("CargarProduct", info)
        }
    } catch (error) {
        console.log("ocurrio un error", error)
    }
    agregarProducto.reset();
})


function borrarProducto(id) {
    socket.emit('eliminarProducto', { id });
}




socket.on("clean", products => {
    console.log("borrar lista")
    divParaBorrar = document.querySelector("#product-list")
    if (divParaBorrar) {
        let productHome = divParaBorrar.querySelectorAll(".productosHome")

        if (productHome.length > 0) {
            productHome.forEach(productHome => {
                productHome.remove()
            })
            console.log("borrado")
        } else {
            console.log("No se encontraron elemento productHome")
        }
    } else {
        console.log("no se encontro div ocn la clase product-list")
    }
})


document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()
    const limitInput = document.getElementById('limit');
    const limitValue = document.getElementById('limitValue');

    // Actualiza el valor mostrado cuando se ajusta el rango
    limitInput.addEventListener('input', () => {
        limitValue.textContent = limitInput.value;
    });

    // Configura el comportamiento del formulario al hacer clic en el botón de envío
    document.getElementById('FormularioProduct').addEventListener('submit', (event) => {
        event.preventDefault(); // Evita el envío por defecto para poder manejar la actualización

        // Recolecta los datos del formulario
        const formData = new FormData(event.target);
        const queryParams = new URLSearchParams(formData).toString();

        // Actualiza la URL con los parámetros del formulario
        window.location.search = queryParams;
    });
});




socket = io()

const addToCartButtons = document.querySelectorAll('.addToCartButton');

addToCartButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const productId = button.getAttribute('data-id');
        try {
            await socket.emit('addToCart', productId);

            alert('Producto agregado al carrito');

        } catch (error) {
            console.error(err)
            res.status(500).json({ error: 'No se puede agregar al carrito', err });
        }
    });
});