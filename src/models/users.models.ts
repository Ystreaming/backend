import { Model, DataTypes } from 'sequelize';
import sequelize from 'sequelize/types/sequelize';
import UserModel from './roles.models';

interface User extends Model {
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
UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  
  export { User };
