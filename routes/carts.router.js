const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require("path")

const cartsPath = path.join(__dirname, '../carts.json');

const data = fs.readFileSync(cartsPath, "utf8")
let carts = JSON.parse(data)


//get
router.get("/carts", (req,res) =>{
    res.json(carts)
})

//GET ID
router.get("/carts/:cid", (req,res) =>{
    const cartID = parseInt(req.params.cid)
    const cart = carts.find((c) => c.id === cartID)
    if (cart){
        res.json(cart)
    }else{
        res.json({msg: "No hay carrito"})
    }
})

//post

router.post("/carts", (req,res) => {
    const newCart = req.body
    carts.push(newCart)
    res.json({message: "carrito agregado"})
})


module.exports = router