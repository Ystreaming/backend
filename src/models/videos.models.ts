
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