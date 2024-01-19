import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
const express = require('express');
const router = express.Router();
const secretKey = "jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA";
const { getUserById } = require('../services/users.services');
import bcrypt from 'bcrypt';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Non authentifié' });
        } else {
            (req as CustomRequest).token = decoded;
            next();
        }
    });
}


async function verifyPassword(req: Request, res: Response, next: NextFunction) {
    const submittedPassword = req.body.password;
    if (!submittedPassword) {
        return res.status(400).json({ message: 'Password is required' });
    }

    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(submittedPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export { isAuthenticated, verifyPassword };