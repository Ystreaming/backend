import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { notificationsValidator } = require('../validators/notifications.validator');
const notificationController = require('../controllers/notifications.controllers');

// => /Notification

router.get('/', notificationController.getAllNotification);

router.post('/', notificationsValidator, notificationController.createNotification);

// => /Notification/id

router.get('/:id', notificationController.getNotificationById);

router.delete('/:id', notificationController.deleteNotification);

// => /Notification/user/id

router.get('/users/:id', notificationController.getNotificationByUserId);

module.exports = router;
