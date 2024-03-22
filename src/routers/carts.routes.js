import Router from 'express'
import CartManager from './../CartManajer.js';

const cartsRouter = Router()
const manager = new CartManager('./src/data/carts.json')

cartsRouter.post('/', async (req, res) => {
    const resp = await manager.createCart()
    res.status(201).send({
        "status": "success",
        "message": resp 
    })
})

cartsRouter.get('/:cid', async (req, res) => {
    const id = parseInt(req.params.cid)
    const resp = await manager.getProductsById(id)
    res.status(200).send({
        "status": "succes",
        "payload": resp
    })
})

cartsRouter.post('/:cid/product/:pid', async (req, res) => {
    const idCart = parseInt(req.params.cid)
    const idProduct = parseInt(req.params.pid)
    const resp = await manager.addProductToCart(idCart, idProduct)
    res.status(201).send({
        "status": "success",
        "message": resp
    })
})

export default cartsRouter