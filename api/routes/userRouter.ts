import express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/'           , userController.getAllUsers);
router.post('/'          , userController.postNewUser);
router.get('/:username'  , userController.getUser);
router.patch('/:username', userController.tokenValidator);
router.patch('/:username', userController.addNewProduct);
router.patch('/:username', userController.quantityChange);
router.patch('/:username', userController.deleteItem);
router.patch('/:username', userController.deleteCart);

module.exports = router;