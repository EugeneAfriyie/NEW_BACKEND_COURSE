const express = require('express');
const { createdAuthor, createBook, getBookWithAuthor } = require('../controllers/BookController');
const router = express.Router();



router.post('/add', createBook);
router.post('/author/add', createdAuthor);
router.post('/book/:id', getBookWithAuthor);
