import express from 'express'
import __dirname from './utils/utils.js'
import productsRouter from './routers/products.routes.js'
import cartsRouter from './routers/carts.routes.js'

const app = express()
const PORT = 8080

// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ROUTERS
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})