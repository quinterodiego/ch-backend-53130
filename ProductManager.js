class ProductManager {
  constructor () {
      this.products = []
  }

  addProduct(product) {
      if(product.title && product.description && product.price && product.thumbnail && product.code && product.stock) {
          if(this.products.length > 0){
              const code = this.products.find(p => p.code === product.code)
              if(code) {
                  return 'Ya existe el codigo de producto'
              }
              product.id = this.products.length + 1
              this.products.push(product)
              return this.products
          } else {
              product.id = 1
              this.products.push(product)
              return this.products
          }
      } else {
          return 'Debe completar todos los campos'
      }
  }

  getProducts() {
      return this.products
  }

  getProductById(id) {
      const product = this.products.find(p => p.id === id)
      if(product){
          return product
      } else {
          return 'Not found'
      }
  }
}

const productManager = new ProductManager()

productManager.getProducts()

const product1 = {
  title: 'producto1',
  description: 'xxxxxxxxxxxx',
  price: 1200,
  thumbnail: 'htpp://xxxxxxxxxxxxx',
  code: 'asfk2223kkk',
  stock: 100
}

const product2 = {
  title: 'producto2',
  description: 'yyyyyyyyyyyyyy',
  price: 5000,
  thumbnail: 'htpp://yyyyyyyyyyyyy',
  code: 'sdfskjdhf11111',
  stock: 80
}

const product3 = {
  title: 'producto3',
  description: 'zzzzzzzzzzzzzzz',
  price: 300,
  thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
  code: 'sdkjhdgkjhs223r555',
  stock: 50
}

console.log(productManager.addProduct(product1))
console.log(productManager.addProduct(product2))
console.log(productManager.addProduct(product3))

console.log('|************************Listado de productos************************|')
const products = productManager.getProducts()
console.log('Products: ', products)


const product4 = {
  title: 'producto4',
  description: 'zzzzzzzzzzzzzzz',
  price: 300,
  thumbnail: 'htpp://zzzzzzzzzzzzzzzzzzzz',
  code: 'sdkjhdgkjhs223r555',
  stock: 50
}

console.log(productManager.addProduct(product4))

console.log('|***********************Buscar producto*************************|')
console.log(productManager.getProductById(3))