import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const VideoService = require('../services/videos.services');
import VideoModel from '../models/videos.models';
const fileService = require('../services/files.services');

async function getAllVideo(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const videos = await VideoService.getAllVideos(skip, limit);
        const totalVideos = await VideoModel.countDocuments();
        const totalPages = Math.ceil(totalVideos / limit);

        res.status(200).json({
            videos,
            totalVideos,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function createVideo(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }
    try {
        let fileId = null;
        if (req.file) {
            const file = await fileService.createFile(req.file);
            fileId = file._id;
        }

        const videoData = {
            ...req.body,
            img: fileId
        };
        const newVideo = await VideoService.addVideo(videoData);

        return res.status(201).json(newVideo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function searchVideo(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const videos = await VideoService.searchVideo(req.params.search as string, skip, limit);
        const totalVideos = await VideoModel.countDocuments();
        const totalPages = Math.ceil(totalVideos / limit);

        res.status(200).json({
            videos,
            totalVideos,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getVideoByCategoryId(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const videos = await VideoService.searchVideoByCategory(req.params.id as string, skip, limit);
        const totalVideos = await VideoModel.countDocuments();
        const totalPages = Math.ceil(totalVideos / limit);

        res.status(200).json({
            videos,
            totalVideos,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getVideoById(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else  {
        const video = await VideoService.getVideoById(req.params.id);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        } else {
            return res.status(200).json(video);
        }
    }
}

async function updateVideo(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        const video = await VideoService.updateVideo(req.params.id, req.body);

        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        } else {
            return res.status(200).json(video);
        }
    }
}

async function deleteVideo(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const video = await VideoService.deleteVideo(req.params.id);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        } else {
            return res.status(200).json({ message: 'Video deleted' });
        }
    }
}

module.exports = {
    getAllVideo,
    searchVideo,
    createVideo,
    getVideoByCategoryId,
    getVideoById,
    updateVideo,
    deleteVideo
};