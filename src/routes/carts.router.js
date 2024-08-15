import {Router} from "express"
import fs from "fs"
import cartModel from "../models/cart.model.js"
import productModel from "../models/product.model.js"

const router = Router()


//POST
router.post('/cart/:pid', async (req, res) => {

    let { pid } = req.params;

    try {

        let cart = await cartModel.findOne();

        if (!cart) {
            cart = new cartModel();
        }

        const productCart = cart.products.find(p => p.product && p.product.toString() === pid);

        if (productCart) {

            productCart.quantity += 1; 

        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();

        const product = await productModel.findById(pid);
        if (product) {
            if (product.stock > 0) {
                product.stock -= 1;
                await product.save();
            } else {
                return res.status(400).json({ message: 'Stock insuficiente' });
            }
        } else {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        res.redirect('/c');
        console.log(productCart);
    } catch (err) {
        console.error(err);
        res.status(404).json({ message: err.message  })
    }         
    
});









































const data = fs.readFileSync("./carts.json", "utf8")
let carts = JSON.parse(data)


//get
router.get("/carts", (req, res) => {
    res.json(carts)
})

//GET ID
router.get("/carts/:cid", (req, res) => {
    const cartID = parseInt(req.params.cid)
    const cart = carts.find((c) => c.id === cartID)
    if (cart) {
        res.json(cart)
    } else {
        res.json({ msg: "No hay carrito" })
    }
})

//post

router.post("/carts", (req, res) => {
    const { productID } = req.body
    let maxId = carts.length
    let i = 1
    carts.forEach(element => {
        elementID = parseInt(element.id)
        if (elementID > i) {
            maxId = i
        } else {
            i = i + 1
        }
    });
    let cartsReverse = carts.toReversed()
    cartsReverse.forEach(element => {
        elementID = parseInt(element.id)
        if (elementID == maxId) {
            maxId = elementID + 1
        }
    });
    quantity = 1
    const newcart = {
        id: maxId++,
        productos: [
            {
                productID,
                quantity
            }
        ]
    }
    carts.push(newcart)
    carts.sort((a, b) => a.id - b.id)
    try {
        const pushCart = JSON.stringify(carts, null, 2);
        fs.writeFileSync(cartsPath, pushCart)
        res.json({ message: "producto agregado" })
    } catch (error) {
        res.json({ error: "Error inesperado" })
    }
})

router.post("/carts/:cid/product/:pid", (req, res) => {
    const cartID = parseInt(req.params.cid)
    const prodID = parseInt(req.params.pid)
    const { quantity } = req.body
    const carrito = carts.find(c => c.id === cartID)
    if (!carrito) {
        return res.status(404).json({ error: "carrito no encontrado" })
    }

    const prodEnCarrito = carrito.productos.find(p => p.productID === prodID)
    console.log(prodEnCarrito)
    carritoProduct = carrito.productos
    if (!prodEnCarrito) {
        newProducto = {
            productID: prodID,
            quantity: quantity
        }
        carritoProduct.push(newProducto)
        carritoProduct.sort((a, b) => a.productID - b.productID)
    }
    if (prodEnCarrito) {
        prodEnCarrito.quantity += quantity
        if (prodEnCarrito.quantity < 1) {
            res.status(404).json({ error: "no puede haber cantidad cero" })
            prodEnCarrito.quantity -= quantity
        }
    }
    try {
        const pushCart = JSON.stringify(carts, null, 2);
        fs.writeFileSync(cartsPath, pushCart)
        res.json({ message: "producto agregado" })
    } catch (error) {
        res.json({ error: "Error inesperado" })
    }
})

//module.exports = router
export default router
