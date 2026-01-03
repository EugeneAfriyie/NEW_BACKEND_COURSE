 const Image = require("../models/image");
 const {uploadToCloudinary} = require("../helpers/cloudinaryHelper")
const fs = require("fs");
const cloudinary = require("cloudinary").v2;

 const uploadImageController = async (req,res)  =>{
    try {
        // check of file is missing

        if (!req.file){
            return res.status(400).json({
                success: false,
                message: "file is missing ,Please upload a file"
            })
        }

         console.log(req.file);

        // upload to cloudinary
        const {url,public_id} = await uploadToCloudinary(req.file.path)

        // save to database(URL,public_id,uploadBy)
        const newlyUploadedImage = new Image({
            url,
            public_id,
            uploadBy : req.userinfo.userId
        })
        await newlyUploadedImage.save();

        // delete the file from local storage
        fs.unlinkSync(req.file.path);

        // response to client   


        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            image : newlyUploadedImage
        });
        
    } catch (error) {
        console.error("Image upload error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
 }


 const fetchAllImagesController = async (req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;
    const skip = (page - 1) * limit;
    const sortedBy = req.query.sortedBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1;
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit)
    const sortedObj = {} 
    sortedObj[sortedBy] = sortOrder

    try {
        const images = await Image.find().sort(sortedObj).skip(skip).limit(limit);
        if(images.length === 0){
            return res.status(404).json({
                success: false,
                message: "No images found"
            });
        }
        res.status(200).json({
            success: true,
            images,
            totalPages,
            totalImages,
            currentPage: page
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
 }

 const imageDeleteController = async (req,res) =>{
    try {
        const imageId = req.params.id;

        const userId = req.userinfo.userId;
        const image = await Image.findById(imageId);
        if(!image){
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        if(image.uploadBy.toString() !== userId){
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this image"
            });
        }

        // Delete from cloudinary/
        await cloudinary.uploader.destroy(image.public_id);

        // delete from database
        await Image.findByIdAndDelete(imageId);

        res.status(200).json({
            success: true,
            message: "Image deleted successfully"
        });
        





        // const image = await Image.findById(imageId);
        // if(!image){
        //     return res.status(404).json({
        //         success: false,
        //         message: "Image not found"
        //     });
        // }
        // await image.remove();
        // res.status(200).json({
        //     success: true,
        //     message: "Image deleted successfully"
        // });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
 }

//  getallImage Controller
const getAllImagesController = async (req, res) => {
    try {
        const images = await Image.find({});    
        res.status(200).json({
            success: true,
            images
        });
    } catch (error) {
        console.error("Error fetching images:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error" 
        });
    }
}









    module.exports = {uploadImageController,fetchAllImagesController,imageDeleteController,getAllImagesController};