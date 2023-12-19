import * as mongoose from 'mongoose';
import { Document, Schema } from 'mongoose';

interface Channel extends Document {
    id: number;
    name: string;
    image: {type: Schema.Types.ObjectId, ref:'Files'};
    description: string;
    idCategory: mongoose.Types.ObjectId;
    idVideos: mongoose.Types.ObjectId[];
}

export default Channel;