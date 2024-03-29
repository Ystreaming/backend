import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const NotificationService = require('../services/notifications.services');
import NotificationModel from '../models/notifications.models';

async function getAllNotification(req: Request, res: Response) {
    /* #swagger.tags = ['Notifications']
        #swagger.description = 'Endpoint to get all notifications' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const notifications = await NotificationService.getAllNotifications(skip, limit);
        const totalNotifications = await NotificationModel.countDocuments();
        const totalPages = Math.ceil(totalNotifications / limit);

        if (!notifications.length) {
            res.status(204).json({ message: 'No notifications found' });
        } else {
            res.status(200).json({
                notifications,
                total: totalNotifications,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createNotification(req: Request, res: Response) {
    /* #swagger.tags = ['Notifications']
        #swagger.description = 'Endpoint to create a new notification' */

    /* #swagger.parameters['Notifications'] = {
            in: 'body',
            description: 'Notification information',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Notifications" }
    } */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    try {
        const newNotification = await NotificationService.createNotification(req.body);
        return res.status(201).json(newNotification);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getNotificationById(req: Request, res: Response) {
    /* #swagger.tags = ['Notifications']
        #swagger.description = 'Endpoint to get notifications by id' */
    try {
        const notification = await NotificationService.getNotificationById(req.params.id);
        if (!notification) {
            res.status(204).json({ message: 'No notification found' });
        } else {
            res.status(200).json(notification);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getNotificationByUserId(req: Request, res: Response) {
    /* #swagger.tags = ['Notifications']
        #swagger.description = 'Endpoint to get notifications by user id' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const notification = await NotificationService.getNotificationByUserId(req.params.id, skip, limit);
        const totalNotification = await NotificationModel.countDocuments();
        const totalPages = Math.ceil(totalNotification / limit);

        if (!notification.length) {
            res.status(204).json({ message: 'No notification found' });
        } else {
            res.status(200).json({
                notification,
                total: totalNotification,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteNotification(req: Request, res: Response) {
    /* #swagger.tags = ['Notifications']
        #swagger.description = 'Endpoint to delete notifications by id' */
    try {
        const notification = await NotificationService.deleteNotification(req.params.id);
        if (!notification) {
            res.status(204).json({ message: 'No notification found' });
        } else {
            res.status(200).json(notification);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllNotification,
    createNotification,
    getNotificationById,
    getNotificationByUserId,
    deleteNotification
};
