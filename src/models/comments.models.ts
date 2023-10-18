import mongoose, { Schema, Document } from 'mongoose';

interface Comment extends Document {
  id: number;
  name: string;
  image: Buffer;
  description: string;
  idCategories: mongoose.Types.ObjectId; 
  idVideos: mongoose.Types.ObjectId;
}
const Comment = new Schema<Comment>({
    id: {
      type:  Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    image: {
      type: Buffer,
      required: true,
      },
      idCategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
      },
      idVideos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Videos',
      },
  });
  const CommentModel = mongoose.model<Comment>('Comments', Comment);
  
  export default CommentModel;