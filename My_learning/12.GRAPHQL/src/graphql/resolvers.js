const {products} = require('../data/product')



const resolvers = {
    Query: {
        products: () => products,
        product: (_, {id}) => products.find(product => product.id === id)
    },
    Mutation: {
        addProduct: (_, {title, category, description, price, instock}) => {
            const newProduct = {
                id: (products.length + 1).toString(),
                title,
                category,
                description,
                price,
                instock
            }
            products.push(newProduct)
            return newProduct
        },
        deleteProduct: (_, {id}) => {
            const productIndex = products.findIndex(product => product.id === id)   
            if (productIndex === -1) {
                throw new Error('Product not found')
            }
            const deletedProduct = products.splice(productIndex, 1)[0]
            return deletedProduct
        },
        updateProduct: (_, {id, title, category, description, price, instock}) => { 
            const product = products.find(product => product.id === id)
            if (!product) {
                throw new Error('Product not found')
            }
            if (title !== undefined) product.title = title
            if (category !== undefined) product.category = category
            if (description !== undefined) product.description = description
            if (price !== undefined) product.price = price
            if (instock !== undefined) product.instock = instock
            return product
        }
        
    }
}



module.exports = resolvers;
