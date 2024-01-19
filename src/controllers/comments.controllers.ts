import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const CommentsService = require('../services/comments.services');
import CommentModel from '../models/comments.models';

async function getAllComment(req: Request, res: Response) {
    /* #swagger.tags = ['Comments']
        #swagger.description = 'Endpoint to get all comments' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const comments = await CommentsService.getAllComments(skip, limit);
        const totalComments = await CommentModel.countDocuments();
        const totalPages = Math.ceil(totalComments / limit);

        if (!comments) {
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
    /* #swagger.tags = ['Comments']
        #swagger.description = 'Endpoint to create a new comment' */

    /* #swagger.parameters['Comments'] = {
            in: 'body',
            description: 'Comment information.',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Comments" }
    } */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    try {
        const newComment = await CommentsService.createComments(req.body);
        return res.status(201).json(newComment);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCommentById(req: Request, res: Response) {
    /* #swagger.tags = ['Comments']
        #swagger.description = 'Endpoint to get comments by id' */
    try {
        const comment = await CommentsService.getCommentsById(req.params.id);
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
    /* #swagger.tags = ['Comments']
        #swagger.description = 'Endpoint to get comments by user id' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const comment = await CommentsService.getCommentsByUserId(req.params.id, skip, limit);
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
    /* #swagger.tags = ['Comments']
        #swagger.description = 'Endpoint to get comments by id' */
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
    /* #swagger.tags = ['Comments']
        #swagger.description = 'Endpoint to delete comments by id' */
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
    getCommentById,
    deleteComment
};