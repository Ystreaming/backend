import { Document, Schema } from 'mongoose';

interface Category extends Document {
    id: number;
    name: string;
    image: {type: Schema.Types.ObjectId, ref:'Files'};
}

export default Category;