import Router from 'express'
import ProductManager from '../ProductManager.js'
import { productValidator } from './../middlewares/productValidator.js'

const productsRouter = Router()
const manager = new ProductManager('./src/data/products.json')

productsRouter.get('/', async (req, res) => {
  try {
    let result = []
    const products = await manager.getProducts()
    const { limit } = req.query
    if(limit) {
      result = products.splice(0, parseInt(limit))
    } else {
      result = products
    }
    res.status(200).json({ 
      "status": "success",
      "result": result 
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudieron obtener los productos" 
    })
  }
   
})

productsRouter.get('/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid)
    const product = await manager.getProductById(id)
    res.status(200).json({ 
      "status": "success",
      "result": product
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo obtener el producto" 
    })
  }
})

productsRouter.post('/', productValidator, async (req, res) => {
  try {
    const product = req.body
    const resp = await manager.addProduct(product)
    res.status(201).send({
        "status": "success",
        "result": resp
      })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo crear el producto" 
    })
  }
   
})

productsRouter.put('/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid)
    const updates = req.body
    const resp = await manager.updateProduct(id, updates)
    res.status(201).send({
        "status": "success",
        "result": resp
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo actualizar el producto" 
    })
  }
   
})

productsRouter.delete('/:pid', async (req, res) => {
  try {
    const id = parseInt(req.params.pid)
    const resp = await manager.deleteProduct(id)
    res.status(200).send({
        "status": "success",
        "result": resp
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo eliminar el producto" 
    })
  }
   
})

export default productsRouter