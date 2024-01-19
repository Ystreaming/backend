import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { videoValidator } = require('../validators/videos.validator');
const videoController = require('../controllers/videos.controllers');
const { uploadSingleFile } = require('../middlewares/file.middleware');
const { isAuthenticated } = require('../middlewares/users.middleware');


// => /Video

router.get('/', videoController.getAllVideo);

router.post('/', isAuthenticated, uploadSingleFile('img'), videoValidator, videoController.createVideo);

// => /video/recommend/

router.get('/recommendation', videoController.getRecommendVideo);

// => /video/mostviewed/

router.get('/mostviewed', videoController.getMostViewedVideos);

// => /Video/id

router.get('/:id', videoController.getVideoById);

router.put('/:id', isAuthenticated, videoValidator, videoController.updateVideo);

router.patch('/:id', isAuthenticated, videoController.addCommentOnVideo);

router.delete('/:id', isAuthenticated, videoController.deleteVideo);

// => /Video/search

router.get('/search/:search', videoController.searchVideo);

// => /video/category/:id

router.get('/category/:id', videoController.getVideoByCategoryId);

// => /view/channel/:id
router.get('/view/channel/:id', videoController.getViewByChannelId);

// => /like/channel/:id
router.get('/like/channel/:id', videoController.getLikeByChannelId);

// => /video/comments/:id

router.get('/comments/:id', videoController.getCommentsByVideoId);

module.exports = router;
