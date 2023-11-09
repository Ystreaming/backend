
import { Document } from 'mongoose';
import mongoose from "mongoose";

interface Role extends Document {
    id: number;
    name: string;
    permission: string;
    idUsers: mongoose.Types.ObjectId;
}

export default Role;