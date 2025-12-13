const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


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
]




app.get('/',(req,res) =>{
    res.render('home',{title: 'Home Page', products: products});
})

app.get('/about', (req,res) =>{
    res.render('about',{title: 'About Page'});
})

const port = 3000;  

app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});
