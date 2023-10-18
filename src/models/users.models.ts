import mongoose, { Schema, Document } from 'mongoose';

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
  profileImage: Buffer;
}

const UserSchema = new Schema<User>({
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: true,
  },
  language: {
    type: String,
    required: true,
  },
  profileImage: {
    type: Buffer,
    required: true,
  },
});

const UserModel = mongoose.model<User>('Users', UserSchema);

export default UserModel;
