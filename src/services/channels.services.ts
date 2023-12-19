import ChannelModel from '../models/channels.models';
import Channel from '../interfaces/channels.interface';

function getAllChannels() {
    return ChannelModel.find()
        .populate('image');
}

function getChannelById(id: string) {
    return ChannelModel.findOne({ _id: id })
        .populate('image')
        .populate('idCategory')
        .populate('idVideos')
        .populate('idUser');
}

function searchChannelByName(name: string) {
    const searchRegex = new RegExp('^' + name, 'i');

    return ChannelModel.find({ name: searchRegex })
        .populate('image');
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
        idCategories: channel.idCategory,
        idVideos: channel.idVideos,
    });
    return newChannel.save();
}

function updateChannel(id: string, channel: Channel) {
    return ChannelModel.findOneAndUpdate({ _id: id }, {
        name: channel.name,
        description: channel.description,
        image: channel.image,
        idCategories: channel.idCategory,
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