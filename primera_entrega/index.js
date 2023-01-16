class ProductManager{
    constructor(){
        this.products = []
    }
        getProducts(){
            return this.products
        }

        addProduct(title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.log('Falta campo')
        } else {

            if(this.checkCode(code)){
                console.log('El código ya se encuentra generado')
            }

            else{

            const product = {
                id: this.#addId(),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            this.products.push(product)
        }
         }   
        } 

        getProductById(id){
            return (this.products.find(product => product.id === id)) || 'Error: Producto no encontrado'
        }


        checkCode(cCode) {
            return this.products.find((product) => product.code === cCode)
        }

        #addId(){
            let id =1
            if (this.products.length!==0){
                id = this.products[this.products.length-1].id + 1
            }
            return id
        }
}

const productManager1 = new ProductManager();
productManager1.addProduct("Ipad","Description",500,"https://......","abc10000",50)
productManager1.addProduct("Ipad","Description",500,"https://......")
productManager1.addProduct("Iphone","Description iphone",100,"https://iphone","abc20000",20)
productManager1.addProduct("Mac","Description Mac",100,"https://mac","abc20000",50)
console.log(productManager1.getProductById(2))
console.log(productManager1.getProductById(4))
console.log(productManager1.getProducts())