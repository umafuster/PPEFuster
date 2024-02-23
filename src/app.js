import express from "express"


// Importo clase ProductManager y CartManager
import ProductManager from "./Components/ProductManager.js"
import CartManager  from "./Components/CartManager.js"

// Importo Rutas
import { productsRouter } from "./Routes/productsRouter.js"
import { cartsRouter } from "./Routes/cartsRouter.js"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

const PORT = 3000


app.use(express.urlencoded({ extended: true }))

export const products = new ProductManager
export const readProducts = products.readProducts()

export const carts = new CartManager


// Middlewares
app.use(express.static(`${__dirname}/public`))

// Importo las Routes
app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)




app.listen(PORT, () => console.log("Server corriendo en puerto: ", PORT))

app.on("error", (error) => console.log("Error en el puerto", PORT))