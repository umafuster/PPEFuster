import { promises as fs } from 'fs'


export default class CartManager {

    constructor() {
        this.path = "src/carts.json"
        this.carts = []
    }


    // Creo modulo para reusar el readFile
    readCarts = async () => {
        let answer = await fs.readFile(this.path, "utf-8")
        return JSON.parse(answer)

    }


    getCarts = async () => {
        let answer2 = await this.readCarts()
        return console.log(answer2)
    }

    // Creo modulo getCartsProducts que traer el carrito con los productos
    getCartsProducts = async (id) => {
        let answer3 = await this.readCarts()
        const cart = answer3.find(cart => cart.id === id)
        if (!cart) {
            console.log("Cart Not Founded")
        } else {
            return cart.products
        }
    }



    newCart = async () => {
        this.carts = await this.readCarts();
        const lastCart = this.carts[this.carts.length - 1];
        const newId = lastCart ? lastCart.id + 1 : 1;
        const newCart = {
            id: newId,
            products: [],
        };

        this.carts.push(newCart);
        await fs.writeFile(this.path, JSON.stringify(this.carts));
        return newCart;
    }




    addProductToCart = async (cid, pid) => {
        let answer4 = await this.readCarts()
        const index = answer4.findIndex(answer4 => answer4.id === cid)
        if (index != -1) {
            const cartProducts = await this.getCartsProducts(id)
            const productFounded = cartProducts.findIndex(product => product.product.id === pid)
            if (productFounded != -1) {
                cartProducts[productFounded].quantity = cartProducts[productFounded].quantity + 1
                //cartProducts[productFounded].quantity++
            } else {
                cartProducts.push({ id: pid, quantity: 1 })
            }

            carts[index].products = cartProducts
            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log("Product Added")
        } else {
            console.log("Cart Not Founded")
        }
    }
}




