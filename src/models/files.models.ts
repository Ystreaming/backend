import mongoose, { Schema } from 'mongoose';
import file from '../interfaces/files.interface';

const FileSchema = new Schema<file>({
    filename: {
        type: String,
        required: true
    },
    originalname: {
        type: String,
        required: true
    },
    encoding: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fieldname: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    }
});

const File = mongoose.model('Files', FileSchema);

export default File;
