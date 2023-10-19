import mongoose, { Schema, Document } from 'mongoose';

interface Categorie extends Document {
    id: number;
    nom: string;
    image: {type: Schema.Types.ObjectId, ref:'Files'};
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Files',
        required: true,
    },
});
const CategorieModel = mongoose.model<Categorie>('Categories', CategoriesSchema);

export default CategorieModel;