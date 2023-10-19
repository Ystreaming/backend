import mongoose, { Schema, Document } from 'mongoose';

interface Channel extends Document {
  id: number;
  name: string;
  image: {type: Schema.Types.ObjectId, ref:'Files'};
  description: string;
  idCategory: mongoose.Types.ObjectId; 
  idVideos: mongoose.Types.ObjectId;
}
const Channel = new Schema<Channel>({
    id: {
      type:  Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    image: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Files',
      required: true,
      },
      idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
      idVideos: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Videos',
      },
  });

  const ChannelModel = mongoose.model<Channel>('Channels', Channel);
  
  export default ChannelModel;