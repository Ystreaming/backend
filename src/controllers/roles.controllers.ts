import { Request, Response } from 'express';
const { validationResult } = require('express-validator');
const RolesService = require('../services/roles.services');
import RolesModel from '../models/roles.models';

async function getAllRoles(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const roles = await RolesService.getAllRoles(skip, limit);
        const totalRoles = await RolesModel.countDocuments();
        const totalPages = Math.ceil(totalRoles / limit);

        if (!roles.length) {
            res.status(204).json({ message: 'No roles found' });
        } else {
            res.status(200).json({
                roles,
                total: totalRoles,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createRoles(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    try {
        const newRole = await RolesService.createRoles(req.body);
        return res.status(201).json(newRole);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getRolesById(req: Request, res: Response) {
    try {
        const roles = await RolesService.getRolesById(req.params.id);
        if (!roles) {
            res.status(204).json({ message: 'No role found' });
        } else {
            res.status(200).json(roles);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateRoles(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const roles = await RolesService.updateRoles(req.params.id, req.body);

        if (!roles) {
            return res.status(404).json({ message: 'Role not found' });
        } else {
            return res.status(200).json(roles);
        }
    }
}

async function deleteRoles(req: Request, res: Response) {
    try {
        const roles = await RolesService.deleteRoles(req.params.id);
        if (!roles) {
            res.status(204).json({ message: 'No role found' });
        } else {
            res.status(200).json(roles);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

  module.exports = {
    getAllRoles,
    createRoles,
    getRolesById,
    updateRoles,
    deleteRoles,
};
