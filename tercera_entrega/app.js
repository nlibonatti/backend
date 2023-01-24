import express from 'express'
import ProductManager from './ProductManager.js'
import UserManager from './ProductManager.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const userManager = new UserManager('/files/products.json')

// endpoints

// products all

app.get('/products', async (req, res) => {
 
  const products = await ProductManager.getProduct(req.query)
  res.json({ message: 'productos encontrados', products })
})

// product one

app.get('/products/:idProduct', async (req, res) => {
  const { idProduct } = req.params
  const product = await ProductManager.getProductById(parseInt(idProduct))
  if(product){
      res.json({ message: 'producto encontrado', product })
  } else {
    res.status(400).send('Usuario no existe')
  }
})

// add product

app.post('/product',async(req,res)=>{
    const product = req.body
  const productAdd =  await ProductManager.addProduct(product)
    res.json({message:'Producto agregado',id:productAdd.id})
})

// delete products

app.delete('/product/:idProduct',async(req,res)=>{
    const {idProduct} = req.params
    await ProductManager.deleteProduct(parseInt(idProduct))
    res.send('Product eliminado')
})

// delete all products

app.delete('/product',async(req,res)=>{
    await ProductManager.deleteAllProducts()
    res.send('Usuarios eliminados')
})








app.listen(8080, () => {
  console.log('Servidor escuchando al puerto 8080')
})