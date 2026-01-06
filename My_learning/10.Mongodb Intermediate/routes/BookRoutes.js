const express = require('express');
const { createdAuthor, createBook } = require('../controllers/BookController');
const router = express.Router();



router.post('/add', createBook);
router.post('/author/add', createdAuthor);
