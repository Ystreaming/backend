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
    try {
        const video = await VideoService.getVideoById(req.params.id);
        if (!video) {
            res.status(204).json({ message: 'No video found' });
        } else {
            res.status(200).json(video);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateVideo(req: Request, res: Response) {
    try {
        const video = await VideoService.updateVideo(req.params.id, req.body);
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        } else {
            return res.status(200).json(video);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteVideo(req: Request, res: Response) {
    try {
        const video = await VideoService.deleteVideo(req.params.id);
        if (!video) {
            res.status(204).json({ message: 'No video found' });
        } else {
            res.status(200).json(video);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCommentsByVideoId(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const comments = await VideoService.getCommentsByVideoId(req.params.id, skip, limit);
        const totalComments = await VideoModel.countDocuments();
        const totalPages = Math.ceil(totalComments / limit);

        if (!comments) {
            res.status(204).json({ message: 'No comment found' });
        } else {
            res.status(200).json({
                comments,
                totalComments,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function addCommentOnVideo(req: Request, res: Response) {
    try {
        const video = await VideoService.addCommentOnVideo(req.params.id, req.body.idComment);
        if (!video) {
            res.status(204).json({ message: 'No video found' });
        } else {
            res.status(200).json(video);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getRecommendVideo(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string, 10) || 50;

    try {
        const videos = await VideoService.getRecommendVideo(limit);
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getMostViewedVideos(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const videos = await VideoService.getMostViewedVideos(limit, skip);
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllVideo,
    searchVideo,
    createVideo,
    getVideoByCategoryId,
    getVideoById,
    updateVideo,
    deleteVideo,
    getCommentsByVideoId,
    addCommentOnVideo,
    getRecommendVideo,
    getMostViewedVideos
};