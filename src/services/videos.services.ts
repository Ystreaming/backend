import VideosModel from '../models/videos.models';
import Videos from '../interfaces/videos.interface';
import mongoose from 'mongoose';

function getAllVideos() {
    return VideosModel.find();
}

function getVideoById(id: string) {
    return VideosModel.findByIdAndUpdate(
        { _id: id },
        { $inc: { view: 1 } },
        { new: true }
    );
}

function getVideoByChannelId(id: string) {
    return VideosModel.find({channel_id: id});
}

function getVideoByCategoryId(id: string) {
    return VideosModel.find({category_id: id});
}

function addVideo(video: Videos) {
    const newVideo = new VideosModel({
        title: video.title,
        created_at: new Date(),
        view: 0,
        like: 0,
        dislike: 0,
        description: video.description,
        language: video.language,
        time: video.time,
        img: video.img,
        url: video.url,
        urllocal: video.urllocal,
        idComment: null,
        idChannel: video.idChannel,
        idCategory: video.idCategory,
    });
    return newVideo.save();
}

function searchVideo(q: string) {
    const searchRegex = new RegExp('^' + q, 'i');

    return VideosModel.find({ title: searchRegex });
}

function searchVideoByCategory(id: string) {
    return VideosModel.find({ idCategory: id });
}

function getViewByChannelId(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return VideosModel.aggregate([
        { $match: { idChannel: objectId } },
        { $group: { _id: null, view: { $sum: "$view" } }}
    ]);
}

function getLikeByChannelId(id: string) {
    const objectId = new mongoose.Types.ObjectId(id);
    return VideosModel.aggregate([
        { $match: { idChannel: objectId } },
        { $group: { _id: null, like: { $sum: "$like" } }}
    ]);
}

function updateVideo(id: string, video: Videos) {
    return VideosModel.findOneAndUpdate({ _id: id }, {
        title: video.title,
        created_at: new Date(),
        view: video.view,
        like: video.like,
        dislike: video.dislike,
        description: video.description,
        language: video.language,
        time: video.time,
        img: video.img,
        url: video.url,
        urllocal: video.urllocal,
        idComment: video.idComment,
        idChannel: video.idChannel,
        idCategory: video.idCategory,
    });
}

function deleteVideo(id: string) {
    return VideosModel.findOneAndDelete({ _id: id });
}

module.exports = {
    searchVideoByCategory,
    searchVideo,
    getAllVideos,
    getVideoById,
    getVideoByChannelId,
    getVideoByCategoryId,
    getViewByChannelId,
    getLikeByChannelId,
    addVideo,
    updateVideo,
    deleteVideo,
};