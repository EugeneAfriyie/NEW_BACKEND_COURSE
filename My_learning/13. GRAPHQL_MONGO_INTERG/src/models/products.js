const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model('Product', productSchema);


