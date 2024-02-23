import { Router } from "express";
import { carts } from "../app.js";

const cartsRouter = Router()



cartsRouter.post('/', async (req, res) => {
    const answer = await carts.newCart()
    if (!answer) return res.status(400).send({ status: "Error Cart Not Created" })
    res.send(answer)

})

cartsRouter.get('/:cid', async (req, res) => {

    let id = parseInt(req.params.cid)
    let allCarts = await carts.readCarts()
    let cartId = allCarts.find((cart) => (cart.id === id))
    if (!cartId) return res.status(404).send({ status: "Cart Not Found" })
    res.send(cartId)

})


cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = parseInt(req.params)

    try {
        const answer = await carts.addProductToCart(cid, pid)
        res.status(200).send({ status: "Success Product Added To Cart", answer })
    } catch (error) {
        res.status(400).send({ status: "Error Product Not Added To Cart" })
    }

})




export { cartsRouter }