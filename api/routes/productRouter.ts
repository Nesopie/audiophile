import express = require('express');
import { tokenValidator } from '../controllers/userController';
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/'               , productController.getAllProducts);
router.get('/:category'      , productController.getByCategory);
router.get('/:category/:slug', productController.getBySlug);
router.use(tokenValidator);
router.post('/:category/:slug', productController.addReview);
router.patch('/:category/:slug', productController.handleUpvote);
router.patch('/:category/:slug', productController.handleDownvote);

module.exports = router;