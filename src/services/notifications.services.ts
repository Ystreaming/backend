import NotificationsModels from '../models/notifications.models';
import Notifications from '../interfaces/notifications.interface';

function getAllNotifications(skip: number, limit: number) {
    return NotificationsModels.find().skip(skip).limit(limit)
        .populate('idUser');
}

function getNotificationById(id: string) {
    return NotificationsModels.findById({ _id: id })
        .populate('idUser');
}

function getNotificationByUserId(id: string) {
    return NotificationsModels.find({idUser: id})
        .populate('idUser');
}

function createNotification(notification: Notifications) {
    const newNotification = new NotificationsModels({
        title: notification.title,
        description: notification.description,
        url: notification.url,
        type: notification.type,
        idUser: notification.idUser,
        created_at: new Date(),
    });
    return newNotification.save();
}

function deleteNotification(id: string) {
    return NotificationsModels.findOneAndDelete({ _id: id });
}

module.exports = {
    getAllNotifications,
    getNotificationById,
    getNotificationByUserId,
    createNotification,
    deleteNotification,
};