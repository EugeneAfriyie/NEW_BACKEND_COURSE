const mongoose = require('mongoose');



const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});module.exports = mongoose.model('Book', BookSchema); 