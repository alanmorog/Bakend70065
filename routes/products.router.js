const express = require("express")
const router = express.Router()

//arreglo de carrito
const products = [{
        id : 1,
        title: "producto 1 ",
        description: "Descripcion del producto 1",
        code : "prod1",
        price: 100,
        status: true,
        stock: 10,
        cateogy: "categoria1",
        thumbnails: ""
    },
    {
        id : 2,
        title: "producto 2 ",
        description: "Descripcion del producto 2",
        code : "prod2",
        price: 100,
        status: true,
        stock: 10,
        cateogy: "categoria2",
        thumbnails: ""
    },
    {
        id : 3,
        title: "producto 3 ",
        description: "Descripcion del producto 3",
        code : "prod3",
        price: 100,
        status: true,
        stock: 10,
        cateogy: "categoria3",
        thumbnails: ""
    },
    {
        id : 4,
        title: "producto 4 ",
        description: "Descripcion del producto 4",
        code : "prod4",
        price: 100,
        status: true,
        stock: 10,
        cateogy: "categoria4",
        thumbnails: ""
    },

]



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