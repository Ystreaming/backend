import { Request, Response } from 'express';
const VideosService = require('../services/videos.service');


    async function getAllVideo (req: Request, res: Response) {
        try {
        const video = await VideosService.getAllVideo();
        if (!video) {
            res.status(404).json({ message: 'Video not found' });
        } else {
            res.status(200).json(video);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
}
    async function getVideoById(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else  {
            const video = await VideosService.getVideoById(req.params.id);

            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            } else {
                return res.status(200).json(video);
            }
        }
}
    async function updateVideo(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            const video = await VideosService.updateVideo(req.params.id, req.body);

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
            const video = await VideosService.deleteVideo(req.params.id);
                if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            } else {
                return res.status(200).json({ message: 'Video deleted' });
            }
        }
}
  module.exports = {
    getAllVideo,
    getVideoById,
    updateVideo,
    deleteVideo
};