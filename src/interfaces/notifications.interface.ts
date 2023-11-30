import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { EventEmitter } from 'events';

interface MyEventEmitter extends EventEmitter {
  emit(event: 'notification', message: any): boolean;
}

interface Notification extends Document, MyEventEmitter {
  id: number;
  title: string;
  description: string;
  url: string;
  type: string;
  idUser: mongoose.Types.ObjectId;
}

export default Notification;
