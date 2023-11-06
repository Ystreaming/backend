import mongoose from "mongoose";

interface Comment extends Document {
    id: number;
    like: number;
    dislike: number;
    texte: string;
    createdAt: Date;
    idUser: mongoose.Types.ObjectId;
}

export default Comment;