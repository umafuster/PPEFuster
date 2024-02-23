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

/* productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const answer = await products.addProduct({title, description, code, price, status, stock, category, thumbnail})
        this.push(answer)
        await fs.writeFile(products.path, JSON.stringify(products.push))
        res.json(answer)
        console.log(answer)
    } catch (error) {
        res.status(400).send({ status: "Error trying to post product" })
    }
}) */

// ES EL QUE FUNCIONAAAAA!!!!
/* productsRouter.post('/', async (req, res) => {
    await readProducts
    //await fs.readFile(products.path, 'utf-8')
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const answer = await products.addProduct({ title, description, code, price, status, stock, category, thumbnail })
        res.send(answer)
        console.log(answer)
    } catch (error) {
        res.status(400).send({ status: "Error trying to post product" })
    }
})
 */


productsRouter.post('/', async (req, res) => {
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
/* productsRouter.post('/', uploader.array('files'), async (req, res) => {
    await readProducts

    const { title, description, code, price, status, stock = true, category, thumbnail } = req.body
    const answer = await products.addProduct({ title, description, code, price, status, stock, category, thumbnail })
    if (!products.title || !products.description || !products.code || !products.price || !products.stock || !products.category) {
        res.status(400).send({ status: "Error trying to post product" })
    } else {
        res.send(answer)
        console.log(answer)
    }

    /*     if (!req.files) {
            return res.status(400).send({ status: "Error", error: "Image not saved" })
        }
        console.log(req.file) 
}) * /

/* productsRouter.post('/', uploader.array('files'), async (req, res) => {
   if (!req.files){
        return res.status(400).send({status: "Error", error:"Image not saved"})
    } 

    const product = req.body
    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnail) {
        res.status(400).send({ status: "Error trying to post product" })
    }
    const answer = await products.addProduct(product)
    res.send(answer)
    await fs.writeFile(products.path, JSON.stringify(products.push))

})  */

/* productsRouter.post('/', async (req, res) => {

    const product = req.body
    if (!product.title || !product.description || !product.code || !product.price || !product.status || !product.stock || !product.category || !product.thumbnail) {
        res.status(400).send({ status: "Error trying to post product" })
    }
    const answer = await products.addProduct(product)
    res.send(answer)
    await fs.writeFile(products.path, JSON.stringify(products.push))

}) */

//TENGO QUE AGREGAR EL UPLOADER DE MULTER EN EL THUMBNAIL !!!!!!!!

/* productsRouter.post('/', async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const allProducts = readProducts
        const answer = await products.addProduct(title, description, code, price, status, stock, category, thumbnail)
        res.json({ allProducts, answer })
        console.log(answer)
    } catch (error) {
        res.status(400).send({ status: "Error trying to post product" })
    }

}) */

/* productsRouter.post('/', async (req, res) => {

    ProductManager.id++

    let newProduct = {
        id: ProductManager.id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    }

    products.push(newProduct)
    await fs.writeFile(products.path, JSON.stringify(products.push))

    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const answer = await products.addProduct(title, description, code, price, status, stock, category, thumbnail)
        res.json(answer)
        console.log(answer)
    } catch (error) {
        res.status(400).send({ status: "Error trying to post product" })
    }



}) */


/* productsRouter.put('/:pid', async (req, res) => {

    let id = parseInt(req.params.pid)
    try {
        const { title, description, code, price, status, stock, category, thumbnail } = req.body
        const answer = await products.updateProducts(id, { title, description, code, price, status, stock, category, thumbnail })
        res.json(answer)
    } catch (error) {
        res.status(400).send({ status: "Error trying to update product" })
    }

}) */

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