import mongoose, { Schema } from 'mongoose';
import User from '../interfaces/users.interface';

const UserSchema = new Schema<User>({
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
  sub: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  profileImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Files',
    required: true,
  },
});

const UserModel = mongoose.model<User>('Users', UserSchema);

export default UserModel;
