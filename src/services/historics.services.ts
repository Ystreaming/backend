import HistoricsModel from '../models/historics.models';
import Historics from '../interfaces/historics.interface';

function getAllHistorics() {
    return HistoricsModel.find();
}

function getHistoricsById(id: string) {
    return HistoricsModel.findById({ _id: id });
}

function getHistoricsByUserId(id: string) {
    return HistoricsModel.find({user_id: id});
}

function createHistorics(historics: Historics) {
    const newHistorics = new HistoricsModel({
        idUser: historics.idUser,
        idVideo: historics.idVideo,
        created_at: new Date(),
    });
    return newHistorics.save();
}

function deleteHistorics(id: string) {
    return HistoricsModel.findOneAndDelete({ _id: id });
}

module.exports = {
    getAllHistorics,
    getHistoricsById,
    getHistoricsByUserId,
    createHistorics,
    deleteHistorics,
};