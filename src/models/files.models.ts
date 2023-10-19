import mongoose, { Schema, Document } from 'mongoose';
const { createModel } = require ('mangoose-gridfs');

const FileSchema = new Schema({
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
module.exports = File;
