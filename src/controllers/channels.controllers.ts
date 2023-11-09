import { Request, Response } from 'express';
const ChannelService = require('../services/channels.services');

    async function getAllChannels(req: Request, res: Response) {
        try {
        const channel = await ChannelService.getAllChannel();
        if (!channel) {
            res.status(204).json({ message: 'Channel not found' });
        } else {
            res.status(200).json(channel);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
}
    async function createChannel(req: Request, res: Response) {
        if (!req.body.idUser || !req.body.idVideo || !req.body.title || !req.body.type) {
            return res.status(400).json({ message: 'idUser, idVideo, title and type are required' });
        } else {
            const channel = await ChannelService.addChannel(req.body);

            if (!channel) {
                return res.status(400).json({ message: 'Channel not created' });
            } else {
                return res.status(201).json(channel);
            }
        }
}
    async function updateChannel(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const channel = await ChannelService.updateChannel(req.params.id, req.body);

            if (!channel) {
                return res.status(404).json({ message: 'Channel not found' });
            } else {
                return res.status(200).json(channel);
            }
        }
}
    async function deleteChannel(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const channel = await ChannelService.deleteChannel(req.params.id);

            if (!channel) {
                return res.status(404).json({ message: 'Channel not found' });
            } else {
                return res.status(200).json({ message: 'Channel deleted' });
            }
        }
}
  module.exports = {
    getAllChannels,
    createChannel,
    updateChannel,
    deleteChannel
};
