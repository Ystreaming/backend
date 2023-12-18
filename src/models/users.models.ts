import mongoose, { Schema } from 'mongoose';
import User from '../interfaces/users.interface';

const UserSchema = new Schema<User>({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
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
  sub: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'channels',
    required: false,
  }],
  language: {
    type: String,
    required: false,
  },
  profileImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Files',
    required: false,
  },
});

const UserModel = mongoose.model<User>('Users', UserSchema);

export default UserModel;
