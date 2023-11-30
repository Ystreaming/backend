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

// => /Channel/search/name

router.get('/search/:name', channelController.searchChannelByName);

// => /Channel/category/id

router.get('/category/:id', channelController.getChannelByCategoryId);

// => /Channel/view
router.get('/view/:id', channelController.getViewByChannelId);

// => /Channel/like
router.get('/like/:id', channelController.getLikeByChannelId);

module.exports = router;
