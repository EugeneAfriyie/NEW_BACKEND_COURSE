 const image = require("../models/image");
 const {uploadToCloudinary} = require("../helpers/cloudinaryHelper")


 const uploadImage = async (req,res)  =>{
    try {
        // check of file is missing

        if (!req.file){
            return res.status(400).json({
                success: false,
                message: "file is missing ,Please upload a file"
            })
        }

        // upload to cloudinary
        const {url,public_id} = await uploadToCloudinary(req.file.path)

        // save to database(URL,public_id,uploadBy)
        const newlyUploadedImage = new image({
            url,
            public_id,
            uploadBy : req.userinfo.userId
        })
        await newlyUploadedImage.save();

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

    module.exports = {uploadImage};