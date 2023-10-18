import mongoose, { Document, Schema } from 'mongoose';

interface NotificationModel extends Document {
  id: number;
  title: string;
  desc: string;
  url: string;
  type: string;
  idUser: mongoose.Types.ObjectId; 
}
const NotificationSchema = new Schema<NotificationModel>({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
        type: String,
        required: true,
      },
    desc: {
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
  
  const NotificationModel = mongoose.model<NotificationModel>('Notifications', NotificationSchema);
  
  export default NotificationModel;