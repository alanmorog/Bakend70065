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