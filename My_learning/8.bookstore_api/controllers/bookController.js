const book = require("../models/book")


const getAllBooks = async(req,res)=>{
        try {
            const allBooks = await book.find({})
            if(allBooks.length > 0){
                res.status(201).json({
                    success:true,
                    message: "Books fetched successfully",
                    data: allBooks
                })
            }  else{
                    res.status(404).json({
                        success:false,
                        message:"No books Found in database"
                    })
                }
        } catch (error) {
            console.log(error)
            res.status(404).json({
                success: false,
                message:"Somehing went wrong!"
            })
        }
}
const getSingleBook = async(req,res)=>{

    try {
        const bookId = req.params.id;
        const singlebook = await book.findById(bookId)

        if(!singlebook){
           return res.status(404).json({
            success:false,
            message:`Book with id ${bookId}  Not found!`

           })
        }

         res.status(201).json({
                success:true,
                message: `Book with id ${bookId} found sucessfully`,
                data: singlebook
            })
    } catch (error) {
        
    }

}
const addNewBook = async(req,res)=>{
    try {
        const newBookFormData = req.body;
        const newlyCreatedBook = await book.create(newBookFormData)
        if(newBookFormData){
          return res.status(201).json({
                success: true,
                message: "Book Added Succesully",
                data: newlyCreatedBook
            })
        }
    } catch (error) {
        
    }
}
const deleteBook = async(req,res)=>{

    try {
        const bookId = req.params.id;
        const deletedbook = await book.findByIdAndDelete(bookId)

        if(!deletedbook){
         return  res.status(404).json({
            success:false,
            message:`Book with id ${bookId}  Not found!`

           })
        }

         res.status(201).json({
                success:true,
                message: `Book with id ${bookId} deleted sucessfully`,
                data: deletedbook
            })
    } catch (error) {
        
    }


}
const updateBook = async(req,res)=>{
        try {
        const updatedFormData = req.body
        const bookId = req.params.id;
        const updatedbook = await book.findByIdAndUpdate(bookId,updatedFormData,{new: true})

        if(!updatedbook){
          return res.status(404).json({
            success:false,
            message:`Book with id ${bookId}  Not found!`

           })
        }

         res.status(201).json({
                success:true,
                message: `Book with id ${bookId} updated sucessfully`,
                data: updatedbook
            })
    } catch (error) {
        
    }

}


module.exports = {getAllBooks,getSingleBook,updateBook,deleteBook,addNewBook}