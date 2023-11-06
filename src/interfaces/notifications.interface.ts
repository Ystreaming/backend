import { Document } from 'mongoose';
import mongoose from "mongoose";

interface Notification extends Document {
    id: number;
    title: string;
    desc: string;
    url: string;
    type: string;
    idUser: mongoose.Types.ObjectId;
}

export default Notification;