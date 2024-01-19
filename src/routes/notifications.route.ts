import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { notificationsValidator } = require('../validators/notifications.validator');
const notificationController = require('../controllers/notifications.controllers');
const { isAuthenticated } = require('../middlewares/users.middleware');

// => /Notification

router.get('/', isAuthenticated, notificationController.getAllNotification);

router.post('/', isAuthenticated, notificationsValidator, notificationController.createNotification);

// => /Notification/id

router.get('/:id', isAuthenticated, notificationController.getNotificationById);

router.delete('/:id', isAuthenticated, notificationController.deleteNotification);

// => /Notification/user/id

router.get('/users/:id', isAuthenticated, notificationController.getNotificationByUserId);

module.exports = router;
