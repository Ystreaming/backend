import { Request, Response } from 'express';
import ChannelModel from '../models/channels.models';
const ChannelService = require('../services/channels.services');
const fileService = require('../services/files.services');
const VideoService = require('../services/videos.services');

async function getAllChannels(req: Request, res: Response) {
    try {
        const channel = await ChannelService.getAllChannels();
        if (channel.length === 0) {
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
    if (!req.body.idUser || !req.body.idVideo) {
        return res.status(400).json({ message: 'idUser, idVideo are required' });
    } else {
        let channelData = req.body;

        if (req.file) {
            const file = await fileService.createFile(req.file);
            channelData.image = file._id;
        }

        const channel = await ChannelService.createChannel(channelData);

        if (!channel) {
            return res.status(400).json({ message: 'Channel not created' });
        } else {
            return res.status(201).json(channel);
        }
    }
}

async function getChannelById(req: Request, res: Response) {
    try {
        const channel = await ChannelService.getChannelById(req.params.id);
        if (!channel) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json(channel);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function searchChannelByName(req: Request, res: Response) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const skip = (page - 1) * limit;

    try {
        const channel = await ChannelService.searchChannelByName(req.params.name, skip, limit);
        const totalChannel = await ChannelModel.countDocuments();
        const totalPages = Math.ceil(totalChannel / limit);

        if (!channel.length) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json({
                channel,
                total: totalChannel,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getChannelByCategoryId(req: Request, res: Response) {
    const page = parseInt(req.query.page as string);
    const limit = parseInt(req.query.limit as string);
    const skip = (page - 1) * limit;

    try {
        const channel = await ChannelService.getChannelByCategoryId(req.params.id, skip, limit);
        const totalChannel = await ChannelModel.countDocuments();
        const totalPages = Math.ceil(totalChannel / limit);

        if (!channel.length) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json({
                channel,
                total: totalChannel,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getViewByChannelId(req: Request, res: Response) {
    try {
        const channel = await VideoService.getViewByChannelId(req.params.id);
        if (!channel.length) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json(channel);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getLikeByChannelId(req: Request, res: Response) {
    try {
        const channel = await VideoService.getLikeByChannelId(req.params.id);
        if (!channel.length) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json(channel);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateChannel(req: Request, res: Response) {
    try {
        const channel = await ChannelService.updateChannel(req.params.id, req.body);
        if (channel.length === 0) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json(channel);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteChannel(req: Request, res: Response) {
    try {
        const channel = await ChannelService.deleteChannel(req.params.id);
        if (!channel) {
            res.status(204).json({ message: 'No channel found' });
        } else {
            res.status(200).json(channel);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllChannels,
    createChannel,
    getChannelById,
    searchChannelByName,
    getChannelByCategoryId,
    getViewByChannelId,
    getLikeByChannelId,
    updateChannel,
    deleteChannel
};
