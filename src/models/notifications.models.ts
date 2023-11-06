import mongoose, { Schema } from 'mongoose';
import Notification from '../interfaces/notifications.interface';

const NotificationSchema = new Schema<Notification>({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
        type: String,
        required: true,
      },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
      },
    idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    },
});

const NotificationModel = mongoose.model<Notification>('Notifications', NotificationSchema);

export default NotificationModel;