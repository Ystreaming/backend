import { Request, Response } from 'express';
const UsersService = require('../services/users.services');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UsersService.getAllUsers();
        if (!users) {
            res.status(404).json({ message: 'Users not found' });
        } else {
            res.status(200).json(users);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newUser = await UsersService.createUser(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getUserById(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else  {
        const user = await UsersService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json(user);
        }
    }
}

async function loginUser(req: Request, res: Response) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'email and password are required' });
    } else {
        const user = await UsersService.loginUser(req.body.email, req.body.password);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const user = await UsersService.loginUser(req.body.email, req.body.password);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json('token');
                return res.status(200).json({ message: 'User logged in' });
            }
        }
    }
}

async function updateUser(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedUser = await UsersService.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json(updatedUser);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteUser(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const user = await UsersService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ message: 'User deleted' });
        }
    }
}

  module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    loginUser,
    updateUser,
    deleteUser
};