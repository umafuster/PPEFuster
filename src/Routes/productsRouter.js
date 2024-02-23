import { Router } from "express";
import { products } from "../app.js";
import { readProducts } from "../app.js";
import { promises as fs } from "fs"
import { uploader } from "../../utils.js";

const productsRouter = Router()


// Pagina products que devuelve todo los productos y tiene limite
productsRouter.get("/", async (req, res) => {

    // Aplico limite
    let limit = parseInt(req.query.limit)
    // Sino hay limite devuelve todo
    if (!limit) return res.send(await readProducts)
    let allProducts = await readProducts
    let productLimit = allProducts.slice(0, limit)
    res.send(productLimit)

})


// Pagina pid que devuelve el producto cuyo id es indicado
productsRouter.get("/:pid", async (req, res) => {

    let id = parseInt(req.params.pid)
    let allProducts = await readProducts
    let productId = allProducts.find((product) => (product.id === id))
    if (!productId) return res.status(404).send({ status: "Id not found" })
    res.send(productId)

})


productsRouter.post('/', uploader.array('files'), async (req, res) => {
    await readProducts

    try {
        const { title, description, code, price, status = true, stock, category, thumbnail } = req.body
        const answer = await products.addProduct({ title, description, code, price, status, stock, category, thumbnail })
        res.send(answer)
        console.log(answer)
    } catch (error) {
        res.status(400).send({ status: "Error trying to post product" })
    }

    if (!req.files) {
        return res.status(400).send({ status: "Error", error: "Image not saved" })
    }
    console.log(req.file)
})


productsRouter.put('/:pid', async (req, res) => {
    // Elimino el producto que recibo por id
    let id = parseInt(req.params.pid)
    await products.deleteProduct(id)
    let product = req.body

    // Traigo los productos que no elimine
    let deletedProduct = await products.readProducts()

    // Agrego el producto modificado mas los que quedaban
    let updatedProduct = [
        { id, ...product }, ...deletedProduct
    ]
    await fs.writeFile(products.path, JSON.stringify(updatedProduct))
    res.send({ status: "Success", payload: updatedProduct })


})


productsRouter.delete('/:pid', async (req, res) => {

    let id = parseInt(req.params.pid)
    try {
        await products.deleteProduct(id)
        res.status(200).send({ status: "Deleted Product" })
    } catch (error) {
        res.status(400).send({ status: "Error deleting product" })
    }

})

export { productsRouter }