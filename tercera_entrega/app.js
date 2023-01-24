import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const productManager = new ProductManager('/files/products.json')

// endpoints

// products all

app.get('/products',(req, res) => {
 
  const products = productManager.getProducts(req.query)
  res.json({ message: 'productos encontrados', products })

})

// product one

app.get('/products/:idProduct', (req, res) => {
  const { idProduct } = req.params
  const product = productManager.getProductById(parseInt(idProduct))
  if(product){
      res.json({ message: 'producto encontrado', product })
  } else {
    res.status(400).send('Usuario no existe')
  }
})

// add product

app.post('/product',(req,res)=>{
    const product = req.body
    productManager.addProduct(product)
    res.send('Producto agregado')
}
)

// add product test

app.post('/prod',(req,res)=>{
  const product = req.body
  console.log(product)
  res.send("prueba")
}
)

// delete products

app.delete('/product/:idProduct',(req,res)=>{
    const {idProduct} = req.params
    productManager.deleteProduct(parseInt(idProduct))
    res.send('Product eliminado')
})

// delete all products

app.delete('/product',(req,res)=>{
    productManager.deleteAllProducts(req.query)
    res.send('Usuarios eliminados')
})

app.listen(8080, () => {
  console.log('Servidor puerto 8080')
})