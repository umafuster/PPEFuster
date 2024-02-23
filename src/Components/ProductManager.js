import { promises as fs } from "fs"

export default class ProductManager {
    constructor() {
        this.path = "src/products.json"
        this.products = [];
    }

    // Creo el id 
    static id = 0;

    // Creo metodo addProduct que agrega un producto
    addProduct = async (title, description, code, price, status, stock, category, thumbnail) => {

        this.products = await this.readProducts()

       /*  ProductManager.id++ */
       const lastProduct = this.products[this.products.length - 1];
       const newId = lastProduct ? lastProduct.id + 1 : 1;

        let newProduct = {
            id: newId,
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnail,
        }

        this.products.push(newProduct)
        await fs.writeFile(this.path, JSON.stringify(this.products))

    }



    // Creo modulo para reusar el readFile
    readProducts = async () => {
        let answer = await fs.readFile(this.path, "utf-8")
        return JSON.parse(answer)
    }

    // Creo modulo getProducts que traer los productos
    getProducts = async () => {
        let answer2 = await this.readProducts()
        return console.log(answer2)
    }

    // Creo modulo getProductsById que traer el producto por el id y si no esta tira mensaje
    getProductsByID = async () => {
        let answer3 = await this.readProducts()
        if (!answer3.find(product => product.id === id)) {
            console.log("Not Found")
        } else {
            console.log(answer3.find(product => product.id === id))
        }
    }

    // Creo modulo updateProducts que actualiza los productos
    updateProducts = async ({ id, ...product }) => {
        // Elimino el producto que recibo por id
        await this.deleteProduct(id)

        // Traigo los productos que no elimine
        let deletedProduct = await this.readProducts()

        // Agrego el producto modificado mas los que quedaban
        let updatedProduct = [
            { id, ...product }, ...deletedProduct
        ]
        await fs.writeFile(this.path, JSON.stringify(updatedProduct))
    }


    // Creo modulo deleteProducts que elimina productos segun el id ingresado
    deleteProduct = async (id) => {
        let answer4 = await this.readProducts()
        let idFilter = answer4.filter(products => products.id != id)
        await fs.writeFile(this.path, JSON.stringify(idFilter))
    }



}

//export default ProductManager;

//const products = new ProductManager


// Agrego Productos
/* products.addProduct("Audi A4", "The A4 is available as a sedan and station wagon.", 12000, "Thumbnail1", "9801", 13)
products.addProduct("Audi A8", "The Audi A8 is a full-size luxury sedan.", 15000, "Thumbnail2", "9802", 8)
products.addProduct("Audi A3", "The Audi A3 is available in two trim levels: Premium and Premium Plus.", 56000, "Thumbnail3", "9803", 9)
products.addProduct("Audi TT", "The Audi TT has Cutting-edge transmission.", 34000, "Thumbnail4", "9804", 3)
products.addProduct("Audi A5", "The Audi A5 is a series of compact executive coupé cars.", 23000, "Thumbnail5", "9805", 17)
products.addProduct("Audi A6", "The Audi A6 is a classic German luxury sedan.", 19000, "Thumbnail6", "9806", 6)
products.addProduct("Audi A7", "The Audi A7 is an executive luxury five-door liftback coupé.", 67000, "Thumbnail7", "9807", 14)
products.addProduct("Audi A1", "The Audi A1 is characterized by its dynamic design", 56000, "Thumbnail8", "9808", 5)
products.addProduct("Audi Q3", "The Audi Q3 features split-folding rear seats that slide and recline, offering many options for passengers and cargo.", 39000, "Thumbnail9", "9809", 8)
products.addProduct("Audi Q5", "The 2024 Audi Q5 is a five-passenger compact luxury SUV offered in Premium, Premium Plus and Prestige trim levels.", 63000, "Thumbnail2", "9810", 16)

 */
// Traigo Productos
//products.getProducts()

// Elimino Productos
//products.deleteProduct(2)

// Actualizo los productos
/* products.updateProducts({
    title: 'Title2',
    description: 'Description2',
    price: 18000,
    thumbnail: 'Thumbnail2',
    code: '5678',
    stock: 8,
    id: 2
}) */