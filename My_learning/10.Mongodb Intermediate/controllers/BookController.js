const Author = require('../models/Author')
const Book = require('../models/Book')


const createdAuthor = async (req, res) => {
  try {
    const { name, age, bio } = req.body;

    const author = new Author({ 
        name,
        age,
        bio
    });
    const savedAuthor = await author.save();

    res.status(201).json({
        success: true,
        data: savedAuthor,
    });
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


const createBook = async (req, res) => {
  try {
    const { title, year, authorId } = req.body;

    const book = new Book({
      title,
      year,
      author: authorId,
    });
    const savedBook = await book.save();

    res.status(201).json({
      success: true,
      data: savedBook,
    });
    } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = {createdAuthor, createBook};