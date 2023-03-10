import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require("fs");
const path = './files/carts.json'

//Carts

export default class CartManager{
    constructor(){
        this.carts = []
    }
        getCart(){
            if (fs.existsSync(path)) {
                const carts = JSON.parse(fs.readFileSync(path, "utf-8"))
                console.log("existe carrito")
                return carts
            } 
            else {
                console.log("no existe carrito")
                }
        }

        addCart(){

            const cart = {
                    id: this.#addId(),
                    product: []
                }
                const cartFile = this.getCart()
                cartFile.push(cart)
                fs.writeFileSync(path, JSON.stringify(cartFile));
                    
                }   

        addProductCart(CartNew){
        const { idProduct, quantity , idCart } = CartNew

        if( !idProduct|| !quantity || !idCart){
            console.log('Falta campo')} 
            else {
            const cart = {
                idProduct,
                quantity
            }
            const cartFile = this.getCart()
            cartFile.push(cart)
            fs.writeFileSync(path, JSON.stringify(cartFile));
                
            }   
        } 

        getCartById(id){
            const carts = this.getCart();
            return (carts.find(cart => cart.id === id)) || 'Error: Carrito no encontrado'
        }

        #addId(){
            let id = 1
            const carts = this.getCart()
            if (carts.length!==0){
                id = carts[carts.length-1].id + 1
            }
            return id
        }
}
