const express = require('express');
const router = express.Router();
const { insertProduct, getProductAnalysis, getProductstats } = require('../controllers/ProductController')

router.post('/add', insertProduct); 
router.get('/getProductsanalysis', getProductAnalysis); 
router.get('/getProductsstats', getProductstats); 



module.exports = router;