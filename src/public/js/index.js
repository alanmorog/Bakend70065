
socket = io()


//Se recibe desde el handlebars la accion de agregar al carrito. Este mismo producto se envia a app.js desde un socket

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



const cartId = '66be9e2daa36b244d4719b69';

// Obtener el botón por su ID
const button = document.getElementById('goToCartButton');

// Agregar un listener al botón para manejar el clic
button.addEventListener('click', () => {
    // Redirigir a la ruta deseada
    window.location.href = `api/carts/${cartId}`;
});



