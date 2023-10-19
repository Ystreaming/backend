import mongoose, { Schema, Document } from 'mongoose';

interface Role extends Document {
  id: number;
  name: string;
  permission: string;
  idUsers: mongoose.Types.ObjectId; 
}
const Role = new Schema<Role>({
    id: {
      type:  Number,
      required: true,
      unique: true,
    },
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