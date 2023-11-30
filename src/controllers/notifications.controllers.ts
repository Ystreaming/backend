import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const NotificationService = require('../services/notifications.services');
import NotificationModel from '../models/notifications.models';

async function getAllNotification(req: Request, res: Response) {
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
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else  {
        const notification = await NotificationService.getNotificationById(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        } else {
            return res.status(200).json(notification);
        }
    }
}

async function getNotificationByUserId(req: Request, res: Response) {
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

async function updateNotification(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const notification = await NotificationService.updateNotification(req.params.id, req.body);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        } else {
            return res.status(200).json(notification);
        }
    }
}

async function deleteNotification(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const notification = await NotificationService.deleteNotification(req.params.id);

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        } else {
            return res.status(200).json({ message: 'Notification deleted' });
        }
    }
}

module.exports = {
    getAllNotification,
    createNotification,
    getNotificationById,
    getNotificationByUserId,
    updateNotification,
    deleteNotification
};
