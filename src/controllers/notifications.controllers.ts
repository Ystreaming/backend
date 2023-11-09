import { Request, Response } from 'express';
const NotificationService = require('../services/notifications.service');

    async function getAllNotification(req: Request, res: Response) {
        try {
        const notification = await NotificationService.getAllNotifications();
        if (!notification) {
            res.status(404).json({ message: 'Notification not found' });
        } else {
            res.status(200).json(notification);
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
    updateNotification,
    deleteNotification
};
