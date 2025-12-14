const express = require('express');
const app = express();
const port = 3000;



;

// root route
app.get('/', (req, res) => {
  res.send('this is routes example home page');
});

app.get('/product',(req,res) =>{
    const products = [{
        id: 1,
        name: 'Sample Product',
        price: 19.99,
        description: 'This is a sample product description.',
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Another Product',
        price: 29.99,
        description: 'This is another product description.',
        category: 'Clothing'
    },
    {
        id: 3,
        name: 'Third Product',
        price: 39.99,
        description: 'This is a third product description.',
        category: 'Books'
    }

];
    res.json(products);     
    }
)

app.get('/product/:id',(req,res) =>{
    console.log("req params" ,req.params);
    const productId = req.params.id
        const products = [{
        id: 1,
        name: 'Sample Product',
        price: 19.99,
        description: 'This is a sample product description.',
        category: 'Electronics'
    },
    {
        id: 2,
        name: 'Another Product',
        price: 29.99,
        description: 'This is another product description.',
        category: 'Clothing'
    },
    {
        id: 3,
        name: 'Third Product',
        price: 39.99,
        description: 'This is a third product description.',
        category: 'Books'
    }

];

products.find(p => p.id == productId) ? res.json(products.find(p => p.id == productId)) :
res.status(404).send({message: 'Product not found'})





});
    



app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});
