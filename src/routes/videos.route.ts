import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { videoValidator } = require('../validators/videos.validator');
const videoController = require('../controllers/videos.controllers');
const { uploadMultipleFiles } = require('../middlewares/file.middleware');


// => /Video

router.get('/', videoController.getAllVideo);

router.post('/',
    uploadMultipleFiles([{ name: 'img', maxCount: 1 }, { name: 'url', maxCount: 1 }]),
    videoController.createVideo
);

// => /Video/id

router.get('/:id', videoController.getVideoById);

router.put('/:id', videoValidator, videoController.updateVideo);

router.patch('/:id', videoController.addCommentOnVideo);

router.delete('/:id', videoController.deleteVideo);

// => /Video/search

router.get('/search/:search', videoController.searchVideo);

// => /video/category/:id

router.get('/category/:id', videoController.getVideoByCategoryId);

// => /video/comments/:id

router.get('/comments/:id', videoController.getCommentsByVideoId);

module.exports = router;
