import mongoose, { Document, Schema } from 'mongoose';

interface HistoricModel extends Document {
  id: number;
  idUser: mongoose.Types.ObjectId; 
  idVideo: mongoose.Types.ObjectId;
}
const HistoricSchema = new Schema<HistoricModel>({
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
    ref: 'Categories',
    },
  });
  
  const HistoricModel = mongoose.model<HistoricModel>('Historics', HistoricSchema);
  
  export default HistoricModel;