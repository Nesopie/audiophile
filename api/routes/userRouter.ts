import express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAllUsers);
router.post('/', userController.postNewUser);
router.get('/:username', userController.getUser)
router.patch('/:username', userController.updateCart);

module.exports = router;