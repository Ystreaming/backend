const userController = require('../controllers/users.controllers');
const express = require('express');
const router = express.Router();
const { userValidator } = require('../validators/users.validator');
const { uploadSingleFile } = require('../middlewares/file.middleware');
const { verifyPassword } = require('../middlewares/users.middleware');

// => /User

router.get('/', userController.getAllUsers);

router.post('/', uploadSingleFile('profileImage'), userController.createUser);

// => /User/id

router.get('/:id', userController.getUserById);

router.put('/:id', verifyPassword, userController.updateUser);

router.delete('/:id', userController.deleteUser);

// => /User/username/:username

router.get('/username/:username', userController.getUserByUsername);

// => /user/sub/:id

router.get('/sub/:id', userController.getSubByUser);

// => /User/login

router.post('/login', userController.loginUser);

// => /users/sub/:id
router.patch('/sub/:id', userController.addSub);

module.exports = router;
