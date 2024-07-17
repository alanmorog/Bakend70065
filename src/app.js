const express = require("express")
const cartRouter = require(".././routes/carts.router.js")
const productsRouter = require(".././routes/products.router.js")

const app = express()
const PORT = 8080


//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))


app.use("/api", cartRouter)
app.use("/api", productsRouter)

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})


