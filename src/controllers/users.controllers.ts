import { Request, Response } from 'express';
const UsersService = require('../services/users.services');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fileService = require('../services/files.services');
import UserModel from '../models/users.models';
import mongoose from 'mongoose';

async function getAllUsers(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to get all users' */
    const page = parseInt(req.query.page as string ?? '1', 10);
    const limit = parseInt(req.query.limit as string ?? '50', 10);
    const skip = (page - 1) * limit;

    try {
        const users = await UsersService.getAllUsers(skip, limit);
        const totalUsers = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            users,
            totalUsers,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createUser(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to create users' */

    /* #swagger.parameters['User'] = {
            in: 'body',
            description: 'User information',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/User" }
    } */
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

        return res.status(201).json({ _id: newUser._id});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getUserById(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
        #swagger.description = 'Endpoint to get users by id' */
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid id' });
        }

        const user = await UsersService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json(user);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getUserByUsername(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to get users by username' */
    const page = parseInt(req.query.page as string ?? '1', 10);
    const limit = parseInt(req.query.limit as string ?? '50', 10);
    const skip = (1 - 1) * limit;

    try {
        const user = await UsersService.getUserByUsername(req.params.username, skip, limit);
        const totalUsers = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        if (!user.length) {
            res.status(404).json({ message: 'No user found' });
        } else {
            res.status(200).json({
                user,
                total: totalUsers,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getSubByUser(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to get sub by userId */
    const page = parseInt(req.query.page as string ?? '1', 10);
    const limit = parseInt(req.query.limit as string ?? '50', 10);
    const skip = (page - 1) * limit;

    try {
        const subItems = await UsersService.getSubByUser(req.params.id, skip, limit);
        if (!subItems || subItems.length === 0) {
            res.status(200).json({ message: 'No content found for user' });
        } else {
            const totalItems = subItems.length;
            const totalPages = Math.ceil(totalItems / limit);

            res.status(200).json({
                subItems,
                total: totalItems,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function loginUser(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to login users' */
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'username and password are required' });
        } else {
            const user = await UsersService.loginUser(req.body.username, req.body.password);
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA', { expiresIn: '100000000h' });
            res.json(token);
        }
    } catch (error) {
        console.error(error);
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateUser(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to update users' */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedUser = await UsersService.updateUser(req.params.id, req.body);
        return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error);
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteUser(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to delete users' */
    try {
        const deletedUser = await UsersService.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function addSub(req: Request, res: Response) {
    /* #swagger.tags = ['Users']
      #swagger.description = 'Endpoint to add sub' */
    if (!req.body.subId) {
        return res.status(400).json({ message: 'Sub is required' });
    }

    try {
        const user = await UsersService.addSub(req.params.id, req.body.subId);
        return res.status(200).json({ message: 'Sub added successfully' });
    } catch (error) {
        console.error(error);
        if (error instanceof Error && error.message === 'User not found') {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


  module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    getSubByUser,
    getUserById,
    loginUser,
    updateUser,
    deleteUser,
    addSub
};