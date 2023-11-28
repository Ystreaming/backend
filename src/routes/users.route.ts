const userController = require('../controllers/users.controllers');
const express = require('express');
const router = express.Router();
const { userValidator } = require('../validators/users.validator');
const { uploadSingleFile } = require('../middlewares/file.middleware');

// => /User

router.get('/', userController.getAllUsers);

router.post('/', uploadSingleFile('profileImage'), userController.createUser);


// => /User/id

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

// => /User/username/:username

// router.get('/username/:username:', userController.getUserByUsername);

// => /User/login
router.get('/login', userController.loginUser);

module.exports = router;
