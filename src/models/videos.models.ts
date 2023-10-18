import mongoose, { Document, Schema } from 'mongoose';

interface VideoModel extends Document {
  title: string;
  createdAt: Date;
  like: number;
  dislike: number;
  description: string;
  language: string;
  time: Date;
  img: Buffer;
  url: string;
  idComment: mongoose.Types.ObjectId; 
  idChannel: mongoose.Types.ObjectId;
  idCategorie: mongoose.Types.ObjectId;
}
const videoSchema = new Schema<VideoModel>({
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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
      type: Date,
      required: true,
    },
    img: {
      type: Buffer,
      required: true,
    },
    url: {
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
      idCategorie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
      },
  });
  const Video = mongoose.model<VideoModel>('Videos', videoSchema);
  
  export default Video;