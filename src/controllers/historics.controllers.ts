import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const HistoricService = require('../services/historics.services');
import HistoricModel from '../models/historics.models';

async function getAllHistoric(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const historics = await HistoricService.getAllHistoric(skip, limit);
        const totalHistorics = await HistoricModel.countDocuments();
        const totalPages = Math.ceil(totalHistorics / limit);

        if (!historics.length) {
            res.status(204).json({ message: 'No historic records found' });
        } else {
            res.status(200).json({
                historics,
                total: totalHistorics,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


async function createHistoric(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    try {
        const newHistoric = await HistoricService.createHistoric(req.body);
        return res.status(201).json(newHistoric);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getHistoricById(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else  {
        const historic = await HistoricService.getHistoricById(req.params.id);

        if (!historic) {
            return res.status(404).json({ message: 'Historic not found' });
        } else {
            return res.status(200).json(historic);
        }
    }
}

async function deleteHistoric(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const historic = await HistoricService.deleteHistoric(req.params.id);

        if (!historic) {
            return res.status(404).json({ message: 'Historic not found' });
        } else {
            return res.status(200).json({ message: 'Historic deleted' });
        }
    }
}

module.exports = {
    getAllHistoric,
    createHistoric,
    getHistoricById,
    deleteHistoric
};
