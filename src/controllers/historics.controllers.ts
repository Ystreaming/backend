import { Request, Response } from 'express';
const HistoricService = require('../services/historics.service');

    async function getAllHistoric(req: Request, res: Response) {
        try {
        const historic = await HistoricService.getAllHistoric();
        if (!historic) {
            res.status(404).json({ message: 'Historic not found' });
        } else {
            res.status(200).json(historic);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
}
    async function updateHistoric(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const historic = await HistoricService.updateHistoric(req.params.id, req.body);

            if (!historic) {
                return res.status(404).json({ message: 'historic not found' });
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
    updateHistoric,
    deleteHistoric
};
