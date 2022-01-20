import express = require('express');
const router = express.Router();

// importing the product controller module
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/:category', productController.getByCategory);

module.exports = router;