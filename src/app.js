import express from "express"
import productsRouter  from "./routes/products.router.js"
import handlebars from "express-handlebars"
import cartRouter from "./routes/carts.router.js"
import __dirname from "./utils.js"
import path from "path"
import viewsRouter from "./routes/views.router.js"


const app = express()
const PORT = 8080


//Middlewares
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

//configurar handlebars para leer el contenido de los endpooint
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
//utilizar recursos estaticos
app.use(express.static(__dirname, + '/public'))

//app.use("/api", cartRouter)
//app.use("/api", productsRouter)
app.use("/", viewsRouter)







//.-----------------------------------------------------------------------------

app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})


