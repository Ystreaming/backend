const HistoricsModel = require('../models/historics.models')

function getAllHistorics() {
    return HistoricsModel.HistoricsModel.find();
}

function getHistoricsById(id: string) {
    return HistoricsModel.HistoricsModel.findById(id);
}

function getHistoricsByUserId(id: string) {
    return HistoricsModel.HistoricsModel.find({user_id: id});
}

function createHistorics(historics: typeof HistoricsModel) {
    const newHistorics = new HistoricsModel.HistoricsModel({
        user_id: historics.user_id,
        video_id: historics.video_id,
        created_at: new Date(),
    });
    return newHistorics.save();
}

function deleteHistorics(id: string) {
    return HistoricsModel.HistoricsModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllHistorics,
    getHistoricsById,
    getHistoricsByUserId,
    createHistorics,
    deleteHistorics,
};