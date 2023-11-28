import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { channelValidator } = require('../validators/channels.validator');
const channelController = require('../controllers/channels.controllers');
const { uploadSingleFile } = require('../middlewares/file.middleware');


// => /Channel
router.get('/', channelController.getAllChannels);

router.post('/', uploadSingleFile('image'), channelValidator, channelController.createChannel);

// => /Channel/id

router.get('/:id', channelController.getChannelById);

router.put('/:id', channelValidator, channelController.updateChannel);

router.delete('/:id', channelController.deleteChannel);

// => /Channel/name

// router.get('/:name', (req: Request, res: Response) => {
//     console.log('GET /channels/:name');
// });

// => /Channel/category/id

router.get('/category/:id', (req: Request, res: Response) => {
    console.log('GET /channels/category/:id');
});

// => /Channel/user/name

router.get('/user/:name', (req: Request, res: Response) => {
    console.log('GET /channels/user/:name');
});

module.exports = router;
