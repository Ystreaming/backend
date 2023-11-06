import mongoose, { Document, Schema } from 'mongoose';
import Historics from '../interfaces/historics.interface';

const HistoricSchema = new Schema<Historics>({
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channels',
    },
    idVideo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Videos',
    },
});

const HistoricModel = mongoose.model<Historics>('Historics', HistoricSchema);

export default HistoricModel;