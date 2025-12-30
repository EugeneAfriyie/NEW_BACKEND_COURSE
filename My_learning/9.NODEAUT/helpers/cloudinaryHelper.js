const cloudinary = require('../config/cloudinary');


const uploadToCloudinary = async (fllepath) => {
    try {
        const result = await cloudinary.uploader.upload(fllepath)
        return {
            url: result.secure_url,
            public_id: result.public_id
        }
        
    } catch (error) {
        console.log("Cloudinary upload error", error);
        throw new Error('Cloudinary upload failed');
    }
}

module.exports = {
    uploadToCloudinary
};