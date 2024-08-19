import express from "express"
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js"

const router = express.Router()

//.----------------------------------------------------------------------------- Server
//Desde aca tomo los datos variables para presentar en home.handlebars


router.get("/", async (req, res) => {

    try {
        let query = {}
        let sort = {}
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;

        const { category, sort: sortOrder, title } = req.query
        if (category) {
            query.category = category
        }

        if (title) {
            query.title = new RegExp(title, "i")
        }

        if (sortOrder) {
            sort.price = sortOrder === "asc" ? 1 : -1
        }

        const options = {
            limit,
            sort,
            page,
            lean: true
        }



        let result = await productModel.paginate(query, options)
        result.payload = result.docs
        result.totalPages = result.totalPages
        result.page = result.page,
            result.hasPrevPage = result.hasPrevPage
        result.hasNextPage = result.hasNextPage
        result.prevLink = result.hasPrevPage ? `http://localhost:8080/?page=${result.prevPage}` : null
        result.nextLink = result.hasNextPage ? `http://localhost:8080/?page=${result.nextPage}` : null
        result.isValid = result.docs.length > 0

        res.render("layouts/home", result)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'No se pueden cargar los productos por categoria', error });
    }


})
router.get("/realTimeproducts", (req, res) => {
    res.render("layouts/realTimeproducts")
})

router.get("/api/carts/66be9e2daa36b244d4719b69", async (req,res) => {
        
    // Renderizar la vista Handlebars con la información del carrito
    res.render('layouts/carts');
})

export default router