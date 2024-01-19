
import { Document, Schema } from 'mongoose';
import mongoose from "mongoose";

interface Video extends Document {
    id: number;
    title: string;
    createdAt: Date;
    view: number;
    like: number;
    dislike: number;
    description: string;
    language: string;
    time: number;
    img: {type: Schema.Types.ObjectId, ref:'Files'};
    url: {type: Schema.Types.ObjectId, ref:'Files'};
    urllocal: string;
    idComment: mongoose.Types.ObjectId[];
    idChannel: mongoose.Types.ObjectId;
    idCategory: mongoose.Types.ObjectId;
}

export default Video;