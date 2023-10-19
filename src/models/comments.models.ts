import mongoose, { Schema, Document } from 'mongoose';

interface Comment extends Document {
  id: number;
  like: number;
  dislike: number;
  texte: string;
  createdAt: Date;
  idCategories: mongoose.Types.ObjectId; 
  idUser: mongoose.Types.ObjectId;
}
const Comment = new Schema<Comment>({
    id: {
      type:  Number,
      required: true,
      unique: true,
    },
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
      idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
  });
  const CommentModel = mongoose.model<Comment>('Comments', Comment);
  
  export default CommentModel;