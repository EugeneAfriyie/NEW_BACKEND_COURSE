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

//intro routes
app.get('/', (req,res) =>{
    res.json({ message: 'Welcome to the Book API' });
})

// get all books 
app.get('/getbooks', (req,res) =>{
    res.json(books)
})


//  get a single book

app.get('/getbooks/:id', (req, res) =>{
    const bookId = parseInt(req.params.id);
    const book = books.find(b => b.id === bookId)

    if (book){
        res.json(book);
    }else{
        res.status(404).json({ message: 'Book not found'});

    }
})

// add a new book
app.post('/addbook', (req,res)=>{
    const newbook = {
        id: books.length + 1,
        title: `Book ${books.length + 1}`,
        author: "Eugene"
}

books.push(newbook);

res.status(201).json(newbook);
res.json({ message: 'Book added successfully' });
res.json(books);
})

// Update book 
app.put('/updatebook/:id', ( req,res) =>{
    const bookId = parseInt(req.params.id)
    const book = books.find(b => b.id === bookId )

    if (!book){
        return res.status(404).json({ message: 'Book not found'});
    }

    if (req.body.title) book.title = req.body.title;
    if (req.body.author) book.author = req.body.author;

    res.json({message: 'Book updated successfully', book, books})
})


// delete a book
app.delete('/deletebook/:id', (req,res) =>{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex === -1){
        return res.status(404).json({ message: 'Book not found'});
    }

    books.splice(bookIndex, 1);

    res.json({ message: 'Book deleted successfully', bookId,bookIndex });
})


app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);
});