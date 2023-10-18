import mongoose, { Document, Schema } from 'mongoose';

interface VideoModel extends Document {
  title: string;
  createdAt: Date;
  like: number;
  dislike: number;
  description: string;
  language: string;
  time: Date;
  img: Buffer;
  url: string;
}