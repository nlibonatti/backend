import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require("fs");

const path = './files/products.json'


export default class ProductManager{
    constructor(){
        this.products = []
    }
        getProducts(){
            if (fs.existsSync(path)) {
                const products = JSON.parse(fs.readFileSync(path, "utf-8"))
                console.log("el producto existe")
                return products
            } 
            else {
                console.log("el producto no existe")
                }
        }
        addProduct(title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Falta campo')
        } else {

            if(this.checkCode(code)){
                console.log('El código ya se encuentra generado')
            }

            else {

            const product = {
                id: this.#addId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            const productsFile = this.getProducts()
            productsFile.push(product)
            fs.writeFileSync(path, JSON.stringify(productsFile));
        }
         }   
        } 

        getProductById(id){
            const products = this.getProducts();
            return (products.find(product => product.id === id)) || 'Error: Producto no encontrado'
        }

        updateProduct(id, changeProduct){
            const products = this.getProducts();
            if (products.find(product => product.id === id)){
                console.log("id encontrado")
                products[index] = { ...products[index], ...changeProduct };
                fs.writeFileSync(this.path, JSON.stringify(products, null, "\t"));

            } else{
                console.log('Error: Producto no encontrado')
            }
        }

        deleteProduct(id){
            const products = this.getProducts()
            const newList = products.filter((product) => product.id !== id)
            fs.writeFileSync(path, JSON.stringify(newList))
            console.log("Producto eliminado")
          }

        deleteAllProducts(){
            if(fs.existsSync(this.path)){
                fs.unlink(this.path)
            }
          }

        checkCode(cCode) {
            const products = this.getProducts()
            return products.find((product) => product.code === cCode)
        }

        #addId(){
            let id = 1
            const products = this.getProducts()
            if (products.length!==0){
                id = products[products.length-1].id + 1
            }
            return id
        }
}

const productManager1 = new ProductManager();
productManager1.addProduct("Ipad","Description",500,"https://......","abc10000",50)
productManager1.addProduct("Ipad","Description",500,"https://......")
productManager1.addProduct("Iphone","Description iphone",100,"https://iphone","ab2000",20)
productManager1.addProduct("Mac","Description Mac",100,"https://mac","abc20000",50)
console.log(productManager1.getProductById(1))
console.log(productManager1.getProductById(4))
productManager1.deleteProduct(1)
//productManager1.updateProduct(2,{"id":1,"title":"Mast"})
console.log(productManager1.getProducts())