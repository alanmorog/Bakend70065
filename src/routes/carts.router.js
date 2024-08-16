import {Router} from "express"
import fs from "fs"
import cartModel from "../models/cart.model.js"


const router = Router()


//POST

router.post("/carts/:cid", async (req, res) => {
    let cart = await cartModel.find({_id: "66be9e2daa36b244d4719b69"})
    cart.products.push({product: "66bd5368b4126180ea88e760", quantity: 2 })
    let result = await cartModel.updateOne({_id: "66be9e2daa36b244d4719b69"}, cart)
    res.send({ result: "success", payload: result })
})


//GET ID
router.get("/carts/:cid", async (req, res) => {
    try {
        let cart = await cartModel.find().populate("products.product")
        console.log(cart)
        res.send({ result: "success", payload: cart })
    } catch (error) {
        console.error(error)
    }
})



































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
