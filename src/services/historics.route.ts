const HistoricsModel = require('../models/historics.model')

function getAllHistorics() {
    return HistoricsModel.HistoricsModel.find();
}

function getHistoricsById(id: number) {
    return HistoricsModel.HistoricsModel.findById(id);
}

function getHistoricsByUserId(id: number) {
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

function deleteHistorics(id: number) {
    return HistoricsModel.HistoricsModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllHistorics,
    getHistoricsById,
    getHistoricsByUserId,
    createHistorics,
    deleteHistorics,
};