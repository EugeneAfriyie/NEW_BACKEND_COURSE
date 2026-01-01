 const Image = require("../models/image");
 const {uploadToCloudinary} = require("../helpers/cloudinaryHelper")
const fs = require("fs");

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
    try {
        const images = await Image.find({});
        if(images.length === 0){
            return res.status(404).json({
                success: false,
                message: "No images found"
            });
        }
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



    module.exports = {uploadImageController,fetchAllImagesController};