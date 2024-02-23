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




    /*     newCart = async () => {
    
            // Leo los carts que ya tengo
            this.carts = await this.readCarts()
    
            // Incremento el ID
            CartManager.id++
    
            const newCart = {
                id: CartManager.id,
                products: [],
            }
            //this.carts = await this.getCarts()
    
            if (!newCart.id) {
                this.carts.push(newCart)
                await fs.writeFile(this.path, JSON.stringify(this.carts))
                return newCart
            } else {
                return "Cart already created"
            } */


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

    /*     async addProductToCart(cartId, productId) {
            try {
                const carts = await this.readCarts();
                const cartIndex = carts.findIndex(cart => cart.id === cartId);
                if (cartIndex !== -1) {
                    const cart = carts[cartIndex];
                    const productIndex = cart.products.findIndex(product => product.id === productId);
                    if (productIndex !== -1) {
                        // Si el producto ya está en el carrito, incrementar la cantidad
                        cart.products[productIndex].quantity++;
                    } else {
                        // Si el producto no está en el carrito, agregarlo con cantidad 1
                        cart.products.push({ id: productId, quantity: 1 });
                    }
                    await this.writeCarts(carts);
                    return cart;
                } else {
                    throw new Error("Cart not found");
                }
            } catch (error) {
                throw new Error("Error adding product to cart: " + error.message);
            }
        }
    
        writeCarts = async (carts) => {
            await fs.writeFile(this.path, JSON.stringify(carts));
        } */

/*     addProductToCart = async (cid, pid) => {
        const carts = await this.getCarts()
        const index = carts.findIndex(cart => cart.id === cid)

        if (index != -1) {
            const cartProducts = await this.getCartByID(cid)
            const productIndex = cartProducts.findIndex(product => product.product.id === pid)

            if (productIndex != -1) {
                cartProducts[productIndex].quantity = cartProducts[productIndex].quantity + 1

            } else {
                cartProducts.push({ pid, quantity: 1 })
            }
            carts[index].products = cartProducts

            await fs.writeFile(this.path, JSON.stringify(carts))
            console.log("Added Product")
        } else {
            console.log("Not Found Product")
        }


    } 
}
*/


