import mongoose, { Document, Schema } from 'mongoose';
import Historics from '../interfaces/historics.interface';

const HistoricSchema = new Schema<Historics>({
    idUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    idVideo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Videos',
    },
});

const HistoricModel = mongoose.model<Historics>('Historics', HistoricSchema);

export default HistoricModel;