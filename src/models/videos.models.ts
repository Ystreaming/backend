
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import VideosModel from './roles.models';

class Video extends Model {
  public id!: number;
  public title!: string;
  public createdAt!: Date;
  public like!: number;
  public dislike!: number;
  public description!: string;
  public language!: string;
  public time!: Date;
  public img!: Buffer;
  public url!: string;
}
Video.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      like: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      dislike: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING, // Utilisez "STRING" pour VARCHAR
        allowNull: true,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      img: {
        type: DataTypes.BLOB, // Utilisez "BLOB" pour les données binaires (image)
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Video',
    }
  );
  
  export { Video };
  