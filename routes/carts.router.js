const express = require("express")
const router = express.Router()

//arreglo de carrito
const carts = []



//get
router.get("/carts", (req,res) =>{
    res.json(carts)
})

//post

router.post("/carts", (req,res) => {
    const newCart = req.body
    carts.push(newCart)
    res.json({message: "carrito agregado"})
})


module.exports = router