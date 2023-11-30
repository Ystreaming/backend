import mongoose, { Schema } from 'mongoose';
import Video from '../interfaces/videos.interface';

const videoSchema = new Schema<Video>({
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    view: {
      type: Number,
      default: 0,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    description: String,
    language: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Files',
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    urllocal: {
      type: String,
      required: true,
    },
    idComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
      },
      idChannel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Channels',
      },
      idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
  });

const VideoModel = mongoose.model<Video>('Videos', videoSchema);

export default VideoModel;