import mongoose, { Schema } from 'mongoose';
import Category from '../interfaces/categories.interface';

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