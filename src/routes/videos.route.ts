import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { videoValidator } = require('../validators/videos.validator');
const videoController = require('../controllers/videos.controllers');
const { uploadSingleFile } = require('../middlewares/file.middleware');


// => /Video

router.get('/', videoController.getAllVideo);

router.post('/', uploadSingleFile('img'), videoValidator, videoController.createVideo);

// => /Video/id

router.get('/:id', videoController.getVideoById);

router.put('/:id', videoValidator, videoController.updateVideo);

router.delete('/:id', videoController.deleteVideo);

// => /Video/user/id

// router.get('/channel/:id', (req: Request, res: Response) => {
//     console.log('GET /videos/channel/:id');
// });

module.exports = router;
