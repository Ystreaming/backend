import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { videoValidator } = require('../validators/videos.validator');
const videoController = require('../controllers/videos.controllers');
const { uploadMultipleFiles } = require('../middlewares/file.middleware');
import { streamVideo } from '../tools/streamVideo';

// => /Video

router.get('/', videoController.getAllVideo);

router.post(
  '/',
  uploadMultipleFiles([{ name: 'img', maxCount: 1 }, { name: 'url', maxCount: 1 }]),
  videoController.createVideo
);

router.put('/:id', videoValidator, videoController.updateVideo);

router.patch('/:id', videoController.addCommentOnVideo);

router.delete('/:id', videoController.deleteVideo);

// => /Video/id

router.get('/:id', videoController.getVideoById);

// => /Video/stream/:id

router.get('/stream/:id', streamVideo);

// => /Video/search

router.get('/search/:search', videoController.searchVideo);

// => /video/category/:id

router.get('/category/:id', videoController.getVideoByCategoryId);

// => /video/comments/:id

router.get('/comments/:id', videoController.getCommentsByVideoId);

module.exports = router;
