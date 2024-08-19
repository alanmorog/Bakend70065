import Router from "express"
import productModel from "../models/product.model.js"


//const router = express.Router()

const router = Router()





//get-------------------------------------------- 
router.get("/products", (req, res) => {
    res.json(products) //envia al postman todos los productos del array
})


router.get("/", async (req, res) => {
    try {
        let product = await productModel.find()
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



export default router