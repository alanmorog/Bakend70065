import Router from "express"

import fs from "fs"
import productModel from "../models/product.model.js"


//const router = express.Router()

const router = Router()

const data = fs.readFileSync("./products.json", "utf8")
let products = JSON.parse(data)



//get-------------------------------------------- 
router.get("/products", (req, res) => {
    res.json(products) //envia al postman todos los productos del array
})


router.get("/", async (req, res) => {
    try {
        let product = await productModel.find()
        console.log(product)
        res.send({ result: "success", payload: product })
        
    } catch (error) {
        console.error(error)
    }

})

router.post("/", async (req, res) => {
    let { id, title, description, code, price, status, stock, category, thumbnails } = req.body
    if (!id || !title || !description || !code || !price || !status || !stock || !category) {
        res.send({ status: "error", error: "faltan parametros" })
    }
    let result = await productModel.create({ id, title, description, code, price, status, stock, category, thumbnails })
    res.send({ result: "success", payload: result })
})


router.put("/:pid", async (req, res) => {
    let { pid } = req.params

    let productToReplace = req.body
    if (!productToReplace.id || !productToReplace.title || !productToReplace.description || !productToReplace.code || !productToReplace.price || !productToReplace.status || !productToReplace.stock || !productToReplace.category) {
        res.send({ status: "error", error: "Faltan parametros" })
    }
    let result = await productModel.updateOne({ _id: pid }, productToReplace)
    res.send({ result: "success", payload: result })
})


router.delete("/:pid", async (req, res) => {
    let { pid } = req.params
    let result = await productModel.deleteOne({ _id: pid })
    res.send({ result: "success", payload: result })
})








//funcionamiento de products con la base de datos mongo Atlas realizado












router.get("/products/:pid", (req, res) => {
    const productId = parseInt(req.params.pid)
    const prod = products.find((p) => p.id === productId) // busca el prodcuto con el Id especifico

    if (prod) {
        res.json(prod) //muestra el producto con id especifico en postman
    } else {
        res.json({ message: "Error al cargar producto" })
    }
})

//post------------------------------------------
router.post("/products", (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body

    let maxId = products.length
    let i = 1
    products.forEach(element => {
        let elementID = parseInt(element.id)
        if (elementID > i) {
            maxId = i
        } else {
            i = i + 1
        }
    });
    let productsReverse = products.toReversed()
    productsReverse.forEach(element => {
        let elementID = parseInt(element.id)
        if (elementID == maxId) {
            maxId = elementID + 1
        }
    });

    const newProduct = {
        id: maxId++,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    }
    products.push(newProduct)
    products.sort((a, b) => a.id - b.id)
    try {
        const pushProducts = JSON.stringify(products, null, 2);
        fs.writeFileSync("./products.json", pushProducts)
        res.json({ message: "producto agregado" })
    } catch (error) {
        res.json({ error: "Error inesperado" })
    }
})

//PUT-------------------------------------------------
router.put("/products/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid)
    const productUpgrade = products.find((p) => p.id === idProduct)
    const { title, description, code, price, status, stock, category, thumbnails } = req.body
    try {
        if (productUpgrade) {
            productUpgrade.title = title,
                productUpgrade.description = description,
                productUpgrade.code = code,
                productUpgrade.price = price,
                productUpgrade.status = status,
                productUpgrade.stock = stock,
                productUpgrade.category = category,
                productUpgrade.thumbnails = thumbnails

            const pushProducts = JSON.stringify(products, null, 2);
            fs.writeFileSync("./products.json", pushProducts)
            res.json({ message: "producto actualziado" })
        } else {
            console.log("no se cargo el producto")
        }
    } catch (error) {
        res.status(404).json({ message: "Error al cargar el producto" }, error)
    }
})

//DELETE-=-----------------------------------------------
router.delete("/products/:pid", (req, res) => {
    const idProduct = parseInt(req.params.pid)
    const productDelete = products.filter((p) => p.id !== idProduct)
    products = productDelete
    const pushProducts = JSON.stringify(productDelete, null, 2);
    fs.writeFileSync("./products.json", pushProducts)
    res.json({ message: "producto eliminado" })
})


//module.exports = router
export default router