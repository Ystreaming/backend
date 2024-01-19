import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { commentsValidator } = require('../validators/comments.validator');
const commentController = require('../controllers/comments.controllers');
const { isAuthenticated } = require('../middlewares/users.middleware');

// => /Comment

router.get('/', isAuthenticated, commentController.getAllComment);

router.post('/', isAuthenticated, commentsValidator, commentController.createComment);

// => /Comment/id

router.get('/:id', commentController.getCommentById);

router.put('/:id', isAuthenticated, commentsValidator, commentController.updateComment);

router.delete('/:id', isAuthenticated, commentController.deleteComment);

// => /Comment/user/id

router.get('/user/:id', isAuthenticated, commentController.getCommentByUserId);

module.exports = router;
