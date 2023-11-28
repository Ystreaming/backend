import { Request, Response } from 'express';
const UsersService = require('../services/users.services');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fileService = require('../services/files.services');

async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UsersService.getAllUsers();
        if (!users) {
            res.status(204).json({ message: 'Users not found' });
        } else {
            res.status(200).json(users);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createUser(req: Request, res: Response) {
    try {
        let fileId = null;
        if (req.file) {
            const file = await fileService.createFile(req.file);
            fileId = file._id;
        }

        const userData = {
            ...req.body,
            profileImage: fileId
        };
        const newUser = await UsersService.createUser(userData);

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
async function getUserByUsername(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.username))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else  {
        const user = await UsersService.getUserByUsername(req.params.username);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json(user);
        }
    }
}

async function loginUser(req: Request, res: Response) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ message: 'username and password are required' });
    } else {
        const user = await UsersService.loginUser(req.body.username, req.body.password);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json(token);
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
        return res.status(400).json({ error: 'ID must be an integer' });
    } else {
        const user = await UsersService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({message: 'User deleted successfully'});
        }
    }
}

  module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getUserById,
    loginUser,
    updateUser,
    deleteUser
};