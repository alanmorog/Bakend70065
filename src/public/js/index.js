document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.addToCartButton');
    
    buttons.forEach(button => {
        button.addEventListener('click', async (event) => {
            event.preventDefault(); // Evita el comportamiento por defecto del botón

            const productId = button.getAttribute('data-id');
            const cartId = '66be9e2daa36b244d4719b69'; 
            
            // Establecer la cantidad por defecto en 1 si no se especifica
            const quantityInput = document.querySelector(`#counter-input-${productId}`);
            const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

            try {
                const response = await fetch(`api/carts/${cartId}/product/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: quantity }), // Enviar la cantidad calculada
                });

                if (response.ok) {
                    alert('Producto agregado al carrito exitosamente!');
                } else {
                    alert('Hubo un problema al agregar el producto al carrito.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al agregar el producto al carrito.');
            }
        });
    });
})