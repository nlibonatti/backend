import express from 'express'
import ProductManager from './ProductManager.js'
import productsRouter from  './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const productManager = new ProductManager('/files/products.json')

// endpoints

app.listen(8080, () => {
  console.log('Servidor puerto 8080')
})