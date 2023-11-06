import { Document, Schema } from 'mongoose';

interface User extends Document {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: Date;
    username: string;
    password: string;
    createdAt: Date;
    status: boolean;
    language: string;
    profileImage: {type: Schema.Types.ObjectId, ref:'Files'};
}

export default User;