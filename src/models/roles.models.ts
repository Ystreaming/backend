import mongoose, { Schema } from 'mongoose';
import Role from '../interfaces/roles.interface';

const Role = new Schema<Role>({
    name: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      required: true,
      },
    idUsers: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
});

const RoleModel = mongoose.model<Role>('Roles', Role);

export default RoleModel;