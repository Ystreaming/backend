import { Document } from 'mongoose';
import mongoose from "mongoose";

interface Notification extends Document {
    id: number;
    title: string;
    description: string;
    url: string;
    type: string;
    idUser: mongoose.Types.ObjectId;
}

export default Notification;