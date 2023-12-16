import ChannelModel from '../models/channels.models';
import Channel from '../interfaces/channels.interface';

function getAllChannels() {
    return ChannelModel.find();
}

function getChannelById(id: string) {
    return ChannelModel.findOne({ _id: id });
}

function searchChannelByName(name: string) {
    const searchRegex = new RegExp('^' + name, 'i');

    return ChannelModel.find({ name: searchRegex });
}

function getChannelByUserId(id: string) {
    return ChannelModel.find({ idUser: id });
}

function getChannelByCategoryId(id: string) {
    return ChannelModel.find({ idCategory: id });
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