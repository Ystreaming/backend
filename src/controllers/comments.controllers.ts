import { Request, Response } from 'express';
const CommentsService = require('../services/historics.service');
const UserService = require('../services/users.services');
const VideoService = require('../services/videos.services')

    async function getAllComment(req: Request, res: Response) {
        try {
        const comment = await CommentsService.getAllComment();
            if (!comment) {
                res.status(204).json({ message: 'Comment not found' });
            } else {
                res.status(200).json(comment);
            }
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
        }
}
    async function updateComment(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const comment = await CommentsService.updateComment(req.params.id, req.body);

            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            } else {
                return res.status(200).json(comment);
            }
        }
}
    async function deleteComment(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const comment = await CommentsService.deleteComment(req.params.id);

            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            } else {
                return res.status(200).json({ message: 'Comment deleted' });
            }
        }
}
    async function getUserById(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else  {
            const user = await UserService.getUserById(req.params.id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            } else {
                return res.status(200).json(user);
            }
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
  module.exports = {
    getAllComment,
    updateComment,
    deleteComment
};