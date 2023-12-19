import mongoose, { Schema } from 'mongoose';
import Channel from '../interfaces/channels.interface';

const Channel = new Schema<Channel>({
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
    subNumber: {
        type: Number,
        default: 0,
    },
    idCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    idVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Videos',
    }],
});

const ChannelModel = mongoose.model<Channel>('Channels', Channel);

export default ChannelModel;