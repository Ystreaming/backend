import mongoose, { Schema, Document } from 'mongoose';

interface Category extends Document {
    id: number;
    name: string;
    image: {type: Schema.Types.ObjectId, ref:'Files'};
  }
  const CategorySchema = new Schema<Category>({
    id: {
      type: Number,
      required: true,
      unique: true, 
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
        required: true,
    },
});
const CategoryModel = mongoose.model<Category>('Category', CategorySchema);

export default CategoryModel;