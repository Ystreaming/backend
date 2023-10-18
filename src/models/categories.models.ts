import mongoose, { Schema, Document } from 'mongoose';

interface Categorie extends Document {
    id: number;
    nom: string;
    image: Buffer;
  }
  const CategoriesSchema = new Schema<Categorie>({
    id: {
      type: Number,
      required: true,
      unique: true, 
    },
    nom: {
        type: String,
        required: true,
    },
    image: {
        type: Buffer,
        required: true,
    },
});
const CategorieModel = mongoose.model<Categorie>('Categories', CategoriesSchema);

export default CategorieModel;
