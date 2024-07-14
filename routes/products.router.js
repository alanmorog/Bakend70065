const express = require("express")
const router = express.Router()
const path = require("path")
const fs = require("fs")


const data = fs.readFileSync("products.json", "utf8")
    const products = JSON.parse(data)



//get
router.get("/", (req,res) =>{
    res.json(products) //envia al postman todos losproductos del array
})

router.get("/:pid", (req,res) =>{
    const productId = parseInt(req.params.pid)
    const prod = products.find((p) => p.id  === productId) // busca el prodcuto con el Id especifico
    //console.log(prod)

    if (prod) {
        res.json(prod) //muestra el producto con id especifico en postman
    }else{
        res.json({message: "Error al cargar producto"})
    }
})

//post

router.post("/", (req,res) => {
    const newProduct = req.body
    console.log(newProduct)
    products.push(newProduct)
    res.json({message: "producto agregado"})
})


module.exports = router