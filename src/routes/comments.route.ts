import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { commentValidator } = require('../validators/comments.validator');
const commentController = require('../controllers/comments.controllers');

// => /Comment

router.get('/', commentController.getAllComments);

router.post('/', commentValidator, commentController.createComment);

// => /Comment/id

router.get('/:id', commentController.getCommentById);

router.put('/:id', commentValidator, commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

// => /Comment/user/id

router.get('/user/:id', (req: Request, res: Response) => {
    console.log('GET /comments/user/:id');
});

// => /Comment/video/id

router.get('/video/:id', (req: Request, res: Response) => {
    console.log('GET /comments/video/:id');
});

module.exports = router;
