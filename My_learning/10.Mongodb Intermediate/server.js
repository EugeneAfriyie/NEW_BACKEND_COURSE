const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const ProductRoutes = require('./routes/ProductRoutes');

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});


// use middleware to parse JSON
app.use(express.json());

app.use('/products', ProductRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});