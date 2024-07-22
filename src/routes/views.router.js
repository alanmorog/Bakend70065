import express from "express"
import fs from "fs"

const router = express.Router()

//.----------------------------------------------------------------------------- Server
//Desde aca tomo los datos variables para presentar en home.handlebars




router.get("/", (req,res) => {
    let  nombre = {
        name: "Usuario"
    }
    const data = fs.readFileSync("./products.json", "utf8")
    let products = JSON.parse(data)
    res.render("layouts/home", {products, nombre})
})


router.get("/realtimeproducts", (req,res) => {
    
    res.render("layouts/realTimeProducts")
})


export default router