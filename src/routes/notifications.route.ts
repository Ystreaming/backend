import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { notificationValidator } = require('../validators/notifications.validator');
const notificationController = require('../controllers/notifications.controllers');

// => /Notification

router.get('/', notificationController.getAllNotifications);

router.post('/', notificationValidator, notificationController.createNotification);

// => /Notification/id

router.get('/:id', notificationController.getNotificationById);

router.put('/:id', notificationValidator, notificationController.updateNotification);

router.delete('/:id', notificationController.deleteNotification);

// => /Notification/user/id

router.get('/users/:id', (req: Request, res: Response) => {
    console.log('GET /users/:id');
});

module.exports = router;
