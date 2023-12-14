import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const CommentsService = require('../services/historics.services');
import CommentModel from '../models/historics.models';

async function getAllComment(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const comments = await CommentsService.getAllComment(skip, limit);
        const totalComments = await CommentModel.countDocuments();
        const totalPages = Math.ceil(totalComments / limit);

        if (!comments.length) {
            res.status(204).json({ message: 'No comments found' });
        } else {
            res.status(200).json({
                comments,
                total: totalComments,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createComment(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    try {
        const newComment = await CommentsService.createComment(req.body);
        return res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCommentById(req: Request, res: Response) {
    try {
        const comment = await CommentsService.getCommentById(req.params.id);
        if (!comment) {
            res.status(204).json({ message: 'No comment found' });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCommentByUserId(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const comment = await CommentsService.getCommentByUserId(req.params.id, skip, limit);
        const totalComment = await CommentModel.countDocuments();
        const totalPages = Math.ceil(totalComment / limit);

        if (!comment.length) {
            res.status(204).json({ message: 'No comment found' });
        } else {
            res.status(200).json({
                comment,
                total: totalComment,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCommentByVideoId(req: Request, res: Response) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const comment = await CommentsService.getCommentByVideoId(req.params.id, skip, limit);
        const totalComment = await CommentModel.countDocuments();
        const totalPages = Math.ceil(totalComment / limit);

        if (!comment.length) {
            res.status(204).json({ message: 'No comment found' });
        } else {
            res.status(200).json({
                comment,
                total: totalComment,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateComment(req: Request, res: Response) {
    try {
        const comment = await CommentsService.updateComment(req.params.id, req.body);
        if (!comment) {
            res.status(204).json({ message: 'No comment found' });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteComment(req: Request, res: Response) {
    try {
        const comment = await CommentsService.deleteComment(req.params.id);
        if (!comment) {
            res.status(204).json({ message: 'No comment found' });
        } else {
            res.status(200).json(comment);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllComment,
    createComment,
    updateComment,
    getCommentByUserId,
    getCommentByVideoId,
    getCommentById,
    deleteComment
};