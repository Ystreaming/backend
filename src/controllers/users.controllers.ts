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
    } else if (req.params.id < 0) {
        return res.status(400).json({ message: 'Id must be a positive integer' });
    } else {
        const user = await UsersService.getUserById(req.params.id);

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
    createUser,
    loginUser,
    updateUser,
    deleteUser
};