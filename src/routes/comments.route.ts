import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { commentsValidator } = require('../validators/comments.validator');
const commentController = require('../controllers/comments.controllers');

// => /Comment

router.get('/', commentController.getAllComment);

router.post('/', commentsValidator, commentController.createComment);

// => /Comment/id

router.get('/:id', commentController.getCommentById);

router.put('/:id', commentsValidator, commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

// => /Comment/user/id

router.get('/user/:id', commentController.getCommentByUserId);

module.exports = router;
