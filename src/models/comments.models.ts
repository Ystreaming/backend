import mongoose, { Schema } from 'mongoose';
import Comment from '../interfaces/comments.interface';

const Comment = new Schema<Comment>({
    texte: {
      type: String,
      required: true,
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    idVideo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Videos',
    },
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
});

const CommentModel = mongoose.model<Comment>('Comments', Comment);

export default CommentModel;