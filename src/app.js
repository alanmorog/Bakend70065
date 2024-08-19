import express from "express"
import productsRouter from "./routes/products.router.js"
import handlebars from "express-handlebars"
import cartRouter from "./routes/carts.router.js"
import __dirname from "./utils.js"
import viewsRouter from "./routes/views.router.js"
import { Server } from "socket.io"
import methodOverride from 'method-override'
import fs from "fs"
import guardarProducto from "./utils/utils.js"
import mongoose from "mongoose"
import cartModel from "./models/cart.model.js"
import productModel from "./models/product.model.js"



const app = express()
const PORT = 8080


//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

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


//mongoose linkeo de mongo atlas
const environment = async () => {
    await mongoose.connect("mongodb+srv://alanmorog:Syncreon23@cluster0.rh6aq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        .then(() => {
            console.log("conectado a la base de datos")
        })
        .catch(error => {
            console.error("error al conectar la base de datos", error)
        })
}
environment()
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

    //se recibe el producto seleccionado para agregar al carrito a traves de socket y se guarda en api/carts/cid
    socket.on("addToCart", async (productId) => {
        try {
            let cart = await cartModel.findOne();
            if (!cart) {
                cart = new cartModel();
            }

            const product = await productModel.findById(productId);

            const existingProduct = cart.products.find(p => p.product.toString() === productId);

            if (existingProduct) {
                if (product.stock > 0) {
                    existingProduct.quantity += 1;
                    product.stock -= 1;
                    await cart.save();
                    await product.save();
                    console.log("Cantidad del producto actualizada en el carrito");
                } else {
                    console.log('Stock insuficiente');
                    return
                }
            } else {
                cart.products.push({ product: productId, quantity: 1 });
                product.stock -= 1;
                await cart.save();
                await product.save();
                console.log("Producto agregado al carrito correctamente");
            }

        } catch (error) {
            console.error("Error al agregar el producto al carrito", error);
        }
    })

})


