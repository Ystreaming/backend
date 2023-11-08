import { Request, Response } from 'express';
const userController = require('../controllers/users.controllers');
const express = require('express');
const router = express.Router();

// => /User

router.get('/', (req: Request, res: Response) => {
    console.log('GET /users');
});

router.post('/', userController.createUser);

// => /User/id

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /users/:id');
});

// => /User/username/:username

router.get('/username/:username:', (req: Request, res: Response) => {
    console.log('GET /users/username/:username');
});

module.exports = router;
