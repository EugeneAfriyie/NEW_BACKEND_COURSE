const express = require('express');
const app = express();
const port = 3000;



// middleware
app.use(express.json());

let books = [
    { id: 1, title: '1984', author: 'George Orwell' },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
]

