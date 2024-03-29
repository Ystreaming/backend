import { Request, Response } from 'express';
const HistoricService = require('../services/historics.services');
import HistoricModel from '../models/historics.models';

async function getAllHistoric(req: Request, res: Response) {
    /* #swagger.tags = ['Historics']
      #swagger.description = 'Endpoint to get all historics' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const historics = await HistoricService.getAllHistorics(skip, limit);
        const totalHistorics = await HistoricModel.countDocuments();
        const totalPages = Math.ceil(totalHistorics / limit);

        if (historics.length === 0) {
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
    /* #swagger.tags = ['Historics']
      #swagger.description = 'Endpoint to create a new historic' */

    /* #swagger.parameters['Historics'] = {
            in: 'body',
            description: 'Historic information.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Historics" }
        } */
    try {
        const newHistoric = await HistoricService.createHistorics(req.body);
        return res.status(201).json(newHistoric);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getHistoricById(req: Request, res: Response) {
    /* #swagger.tags = ['Historics']
      #swagger.description = 'Endpoint to get historic by id' */
    try {
        const historic = await HistoricService.getHistoricsById(req.params.id);
        if (!historic) {
            res.status(204).json({ message: 'No historic records found' });
        } else {
            res.status(200).json(historic);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getHistoricByUserId(req: Request, res: Response) {
    /* #swagger.tags = ['Historics']
      #swagger.description = 'Endpoint to get historic by user id' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const historic = await HistoricService.getHistoricsByUserId(req.params.id, skip, limit);
        const totalHistorics = await HistoricModel.countDocuments();
        const totalPages = Math.ceil(totalHistorics / limit);

        if (!historic.length) {
            res.status(204).json({ message: 'No historic records found' });
        } else {
            res.status(200).json({
                historic,
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

async function deleteHistoric(req: Request, res: Response) {
    /* #swagger.tags = ['Historics']
      #swagger.description = 'Endpoint to delete historic by id' */
    try {
        const historic = await HistoricService.deleteHistorics(req.params.id);
        if (!historic) {
            res.status(204).json({ message: 'No historic records found' });
        } else {
            res.status(200).json(historic);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllHistoric,
    createHistoric,
    getHistoricByUserId,
    getHistoricById,
    deleteHistoric
};
