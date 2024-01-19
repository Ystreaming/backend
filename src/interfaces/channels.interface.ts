import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';
import User from './users.interface';

interface Channel extends Document {
    id: number;
    name: string;
    image: {type: Schema.Types.ObjectId, ref:'Files'};
    description: string;
    subNumber: number;
    idCategory: mongoose.Types.ObjectId;
    idVideos: mongoose.Types.ObjectId[];
    idUser: mongoose.Types.ObjectId | User;
}

export default Channel;