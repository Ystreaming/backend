import { Request, Response } from 'express';
const UsersService = require('../services/users.service');
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
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ message: 'User logged in' });
        }
    }
}
async function updateUser(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else if (!req.body.firstName || !req.body.firstName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'firstName, lastName, email and password are required' });
    } else {
        const user = await UsersService.updateUser(req.params.id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json(user);
        }
    }
}
async function deleteUser(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else if (!req.body.firstName || !req.body.firstName || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'firstName, lastName, email and password are required' });
    } else {
        const user = await UsersService.updateUser(req.params.id, req.body);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            return res.status(200).json(user);
        }
    }
}
  module.exports = {
    getAllUsers,
    getUserById,
    loginUser
};