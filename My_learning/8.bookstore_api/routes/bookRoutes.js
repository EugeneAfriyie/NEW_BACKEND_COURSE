const express = require("express");
const { getAllBooks, getSingleBook, addNewBook, updateBook, deleteBook } = require("../controllers/bookController");

// Create express Router

const router = express.Router();

// all the routes that are related to books only

router.get("/get" , getAllBooks)
router.get("/get/:id" , getSingleBook)
router.post("/add" , addNewBook)
router.put("/update/:id" , updateBook)
router.delete("/delete/:id" , deleteBook)

module.exports = router