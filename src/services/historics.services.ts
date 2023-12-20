import HistoricsModel from '../models/historics.models';
import Historics from '../interfaces/historics.interface';

function getAllHistorics(skip: number, limit: number) {
    return HistoricsModel.find()
        .populate({
            path: 'idVideo',
            populate: {
                path: 'img',
                model: 'Files',
            }
        })
        .skip(skip)
        .limit(limit);
}

function getHistoricsById(id: string) {
    return HistoricsModel.findById({ _id: id })
        .populate({
            path: 'idVideo',
            populate: {
                path: 'img',
                model: 'Files',
            }
        });
}

function getHistoricsByUserId(id: string) {
    return HistoricsModel.find({idUser: id})
        .populate({
            path: 'idVideo',
            populate: {
                path: 'img',
                model: 'Files',
            }
        });
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