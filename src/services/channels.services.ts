const ChannelModel = require('../models/channel.model');

function getAllChannels() {
    return ChannelModel.ChannelModel.find();
}

function getChannelById(id: number) {
    return ChannelModel.ChannelModel.findOne({ id: id });
}

function getChannelByName(name: string) {
    return ChannelModel.ChannelModel.findOne({ name: name });
}

function getChannelByUserId(id: number) {
    return ChannelModel.ChannelModel.find({ user_id: id });
}

function getChannelByCategoryId(id: number) {
    return ChannelModel.ChannelModel.find({ category_id: id });
}

function createChannel(channel: typeof ChannelModel) {
    const newChannel = new ChannelModel.ChannelModel({
        name: channel.name,
        description: channel.description,
        image: channel.image,
        idCategories: channel.idCategories,
        idVideos: channel.idVideos,
    });
    return newChannel.save();
}

function updateChannel(id: number, channel: typeof ChannelModel) {
    return ChannelModel.ChannelModel.findOneAndUpdate({ id: id }, {
        name: channel.name,
        description: channel.description,
        image: channel.image,
        idCategories: channel.idCategories,
        idVideos: channel.idVideos,
    });
}

function deleteChannel(id: number) {
    return ChannelModel.ChannelModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllChannels,
    getChannelById,
    getChannelByName,
    createChannel,
    updateChannel,
    deleteChannel,
};