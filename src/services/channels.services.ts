import ChannelModel from '../models/channels.models';
import Channel from '../interfaces/channels.interface';

function getAllChannels(skip: number, limit: number) {
    return ChannelModel.find()
        .populate('image')
        .populate({
            path: 'idUser',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .skip(skip)
        .limit(limit);
}

function getChannelById(id: string) {
    return ChannelModel.findOne({ _id: id })
        .populate('image')
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idUser',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idVideos',
            populate: {
                path: 'img',
                model: 'Files',
            }
        });
}

function searchChannelByName(name: string, skip: number, limit: number) {
    const searchRegex = new RegExp('^' + name, 'i');

    return ChannelModel.find({ name: searchRegex })
        .populate('image')
        .populate({
            path: 'idVideos',
            populate: {
                path: 'img',
                model: 'Files',
            }
        })
        .populate({
            path: 'idUser',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .skip(skip)
        .limit(limit);
}

function getChannelByUserId(id: string) {
    return ChannelModel.find({ idUser: id })
        .populate('image');
}

function getChannelByCategoryId(id: string) {
    return ChannelModel.find({ idCategory: id })
        .populate('image');
}

function createChannel(channel: Channel) {
    const newChannel = new ChannelModel({
        name: channel.name,
        description: channel.description,
        image: channel.image,
        subNumber: 0,
        idCategories: channel.idCategory,
        idVideos: channel.idVideos,
        idUser: channel.idUser,
    });
    return newChannel.save();
}

function updateChannel(id: string, channel: Channel) {
    return ChannelModel.findOneAndUpdate({ _id: id }, {
        name: channel.name,
        description: channel.description,
        image: channel.image,
        idCategory: channel.idCategory,
        idVideos: channel.idVideos,
    });
}

function deleteChannel(id: string) {
    return ChannelModel.findOneAndDelete({ _id: id });
}

module.exports = {
    getChannelByUserId,
    getChannelByCategoryId,
    searchChannelByName,
    getAllChannels,
    getChannelById,
    createChannel,
    updateChannel,
    deleteChannel,
};