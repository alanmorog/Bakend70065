import { Router } from "express"
import cartModel from "../models/cart.model.js"
import express from "express"


const router = Router()


//POST

router.post("/carts/:cid", async (req, res) => {
    let cart = await cartModel.find({ _id: "66be9e2daa36b244d4719b69" })
    cart.products.push({ product: "66bd5368b4126180ea88e760", quantity: 2 })
    let result = await cartModel.updateOne({ _id: "66be9e2daa36b244d4719b69" }, cart)
    res.send({ result: "success", payload: result })
})


//GET ID
router.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = "66be9e2daa36b244d4719b69";

        // Obtener el carrito por ID y poblar los productos
        let cart = await cartModel.findById(cartId).populate('products.product')

        // Verifica si el carrito existe
        if (!cart) {
            return res.status(404).send({ result: 'error', message: 'Carrito no encontrado' });
        }

        // Filtrar los datos para pasar solo las propiedades propias
        const cartData = {
            id: cart._id,
            products: cart.products.map(p => ({
                product: {
                    id: p.product._id,          // ID del producto
                    title: p.product.title,     // Título del producto
                    price: p.product.price      // Precio del producto
                },
                quantity: p.quantity
            }))
        };
        //console.log(cart.products)
        // Renderizar la vista Handlebars con los datos filtrados
        res.render('layouts/carts', { cart: cartData });
    } catch (error) {
        console.error(error);
        res.status(500).send({ result: 'error', message: 'Error interno del servidor' });
    }
});






export default router 
