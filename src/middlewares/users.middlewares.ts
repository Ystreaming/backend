import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
const express = require('express');
const router = express.Router();
const secretKey = 'votre_secret_key'; 

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization; 
    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    jwt.verify(token, secretKey, (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Non authentifié' });
        } else {
            (req as CustomRequest).token = decoded;
            next();
        }
    });
}