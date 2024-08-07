import express from "express"
import productsRouter from "./routes/products.router.js"
import handlebars from "express-handlebars"
import cartRouter from "./routes/carts.router.js"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io"
import fs from "fs"
import guardarProducto from "./utils/utils.js"



const app = express()
const PORT = 8080


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//configurar handlebars para leer el contenido de los endpooint
app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")
app.use(express.static(__dirname, + '/public'))

app.use("/api", cartRouter)
app.use("/api", productsRouter)
app.use("/", viewsRouter)






const data = fs.readFileSync("./products.json", "utf8")
let products = JSON.parse(data)
let clean

//.-----------------------------------------------------------------------------


const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
const socketServer = new Server(httpServer)


socketServer.on("connection", socket => {
    console.log("update")
    socketServer.emit("productListServer", products)

    socket.on("CargarProduct", info => {
        guardarProducto(info)
        const data = fs.readFileSync("./products.json", "utf8")
        let products = JSON.parse(data)
        socketServer.emit("clean", products)
        socketServer.emit("productListServer", products)
    })  

    socket.on("eliminarProducto", data => {
        console.log('Remove product:', data);
        const idProduct = data.id
        console.log(idProduct)
        const productDelete = products.filter((p) => p.id !== idProduct)
        products = productDelete
        const pushProducts = JSON.stringify(productDelete, null, 2);
        fs.writeFileSync("./products.json", pushProducts)
        socketServer.emit("clean", products)
        socketServer.emit("productListServer", products)

    })
    
})

