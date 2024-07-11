const express = require("express")
const router = express.Router()

//arreglo de carrito
const products = []



//get
router.get("/products", (req,res) =>{
    res.json(products)
})

//post

router.post("/products", (req,res) => {
    const newProduct = req.body
    products.push(newProduct)
    res.json({message: "producto agregado"})
})


module.exports = router