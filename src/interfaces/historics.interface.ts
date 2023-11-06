import { Document } from 'mongoose';
import mongoose from "mongoose";

interface Historics extends Document {
    id: number;
    idUser: mongoose.Types.ObjectId;
    idVideo: mongoose.Types.ObjectId;
}

export default Historics;