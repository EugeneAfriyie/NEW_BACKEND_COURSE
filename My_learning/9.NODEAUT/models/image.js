const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    },
    uploadBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true 
})

module.exports = mongoose.model("Image", imageSchema)