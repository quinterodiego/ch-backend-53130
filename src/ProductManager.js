import fs from 'fs'

class ProductManager {
  static lastID = 0
  constructor (path) {
    this.path = path
  }

  async addProduct(product) {
    try {
      if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
        const data = await fs.promises.readFile(this.path, 'utf-8')
        const products = await JSON.parse(data);

        if(products.length > 0){
            const code = products.find(p => p.code === product.code)
            if(code) {
                return 'Ya existe el codigo de producto'
            }

            product.id = ++ProductManager.lastID,
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        } else {
            product.id = 1
            products.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return 'El producto fue agregado'
        }
      } else {
          return 'Debe completar todos los campos'
      }
    } catch (error) {
        console.log(error)
    }
  }

  async getProducts() {
      try {
          const data = await fs.promises.readFile(this.path, 'utf-8')
          const products = await JSON.parse(data)
          return products
      } catch (error) {
          console.log(error)
      }
  }

  async getProductById(id) {
      try {
          const data = await fs.promises.readFile(this.path, 'utf-8')
          const products = await JSON.parse(data)
          const product = products.find(p => p.id === id)
          if(product){
              return product
          } else {
              return 'Not found'
          }
      } catch (error) {
          console.log(error)
      }
  }

  async updateProduct(id, updates) {
      try {
          const data = await fs.promises.readFile(this.path, 'utf-8')
          const products = await JSON.parse(data)
          const oldProduct = products.find(prod => prod.id === id)
          const newProduct = { ...oldProduct, ...updates }
          products[id - 1] = newProduct
          await fs.promises.writeFile(this.path, JSON.stringify(products))
          return 'Productos actualizado'
      } catch (error) {
          console.log(error)
      }
  }

  async deleteProduct(id) {
      try {            
          const data = await fs.promises.readFile(this.path, 'utf-8')
          const products = await JSON.parse(data)
          const newProducts = products.filter(p => p.id !== id)
          await fs.promises.writeFile(this.path, JSON.stringify(newProducts))
          return 'Producto eliminado'
      } catch (error) {
          console.log(error)
      }
  }
}

export default ProductManager