import { Request, Response, NextFunction } from 'express';
const express = require('express');
const secretKey = process.env.SECRET_KEY as string;
import jwt, { JwtPayload } from 'jsonwebtoken';
const RoleServices = require('../services/roles.services');

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

async function isUserInRoleAdministrator(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Non authentifié' });
        } else {
            (req as CustomRequest).token = decoded;
            const isUserInRole = await RoleServices.isUserInRole(decoded.id, "Administrator");
            if (!isUserInRole) {
                return res.status(403).json({ message: 'Non autorisé' });
            }
            next();
        }
    });
}

async function isUserInRoleStreamer(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Non authentifié' });
        } else {
            (req as CustomRequest).token = decoded;
            const isUserInRole = await RoleServices.isUserInRole(decoded.id, "Streamer");
            if (!isUserInRole) {
                return res.status(403).json({ message: 'Non autorisé' });
            }
            next();
        }
    });
}

export { isUserInRoleAdministrator, isUserInRoleStreamer };