import { Request, Response } from 'express';
const userController = require('../controllers/users.controllers');
const express = require('express');
const router = express.Router();
const { userValidator } = require('../validators/users.validator');

// => /User

router.get('/', userController.getAllUsers);

router.post('/', userValidator, userController.createUser);

// => /User/id

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

// => /User/username/:username

router.get('/username/:username:', (req: Request, res: Response) => {
    console.log('GET /users/username/:username');
});

module.exports = router;
