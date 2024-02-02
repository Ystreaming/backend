import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { channelValidator } = require('../validators/channels.validator');
const channelController = require('../controllers/channels.controllers');
const { uploadSingleFile } = require('../middlewares/file.middleware');
const { isAuthenticated } = require('../middlewares/users.middleware');

// => /Channel

router.get('/', isAuthenticated, channelController.getAllChannels);

router.post('/', isAuthenticated, uploadSingleFile('image'), channelValidator, channelController.createChannel);

// => /Channel/id

router.get('/:id', channelController.getChannelById);

router.put('/:id', isAuthenticated, channelValidator, channelController.updateChannel);

router.delete('/:id', isAuthenticated, channelController.deleteChannel);

// => /Channel/search/name

router.get('/search/:name', channelController.searchChannelByName);

// => /Channel/category/id

router.get('/category/:id', channelController.getChannelByCategoryId);

// => /Channel/view

router.get('/view/:id', channelController.getViewByChannelId);

// => /Channel/like

router.get('/like/:id', channelController.getLikeByChannelId);

// => /Channel/user/id
router.get('/user/:id', channelController.getChannelByUserId);

module.exports = router;
