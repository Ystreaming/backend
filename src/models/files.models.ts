import mongoose, { Schema } from 'mongoose';
import file from '../interfaces/files.interface';

const FileSchema = new Schema<file>({
    filename: {
        type: String,
        required: true
    },
    contentType: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    chunkSize: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    aliases: [String],
    metadata: Schema.Types.Mixed,
    md5: {
        type: String,
        required: true
    }
});

const File = mongoose.model('Files', FileSchema);

export default File;
