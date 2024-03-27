import Router from 'express'
import CartManager from './../CartManajer.js';

const cartsRouter = Router()
const manager = new CartManager('./src/data/carts.json')

cartsRouter.post('/', async (req, res) => {
  try {
    const resp = await manager.createCart()
    res.status(201).send({
      "status": "success",
      "result": resp
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo crear el carrito" 
    })
  }
})

cartsRouter.get('/:cid', async (req, res) => {
  try {
    const id = parseInt(req.params.cid)
    const resp = await manager.getProductsById(id)
    res.status(200).send({
        "status": "success",
        "payload": resp
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo obtener el carrito" 
    })
  }
    
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const idCart = parseInt(req.params.cid)
    const idProduct = parseInt(req.params.pid)
    const resp = await manager.addProductToCart(idCart, idProduct)
    res.status(201).send({
        "status": "success",
        "message": resp
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({ 
      "status": "error",
      "message": "No se pudo agregar el producto al carrito" 
    })
  }
    
})

export default cartsRouter