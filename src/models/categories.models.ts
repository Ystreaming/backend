import mongoose, { Schema, Document } from 'mongoose';

interface Categorie extends Document {
    id: number;
    nom: string;
    image: Buffer;
  }
  const categoriesSchema = new Schema<Categorie>({
    id: {
      type: Number,
      required: true,
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

const UserModel = mongoose.model<Categorie>('Categorie', categoriesSchema);

export default UserModel;
