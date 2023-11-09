const VideosModel = require('../models/videos.models');

function getAllVideos() {
    return VideosModel.VideosModel.find();
}

function getVideoById(id: string) {
    return VideosModel.VideosModel.findById(id);
}

function getVideoByChannelId(id: string) {
    return VideosModel.VideosModel.find({channel_id: id});
}

function getVideoByCategoryId(id: string) {
    return VideosModel.VideosModel.find({category_id: id});
}

function addVideo(video: typeof VideosModel) {
    const newVideo = new VideosModel.VideosModel({
        title: video.title,
        created_at: new Date(),
        like: 0,
        dislike: 0,
        description: video.description,
        language: video.language,
        time: video.time,
        img: video.img,
        url: video.id,
        idComment: null,
        idChannel: video.idChannel,
        idCategorie: video.idCategorie,
    });
    return newVideo.save();
}

function updateVideo(id: string, video: typeof VideosModel) {
    return VideosModel.VideosModel.findOneAndUpdate({ id: id }, {
        title: video.title,
        created_at: new Date(),
        like: video.like,
        dislike: video.dislike,
        description: video.description,
        language: video.language,
        time: video.time,
        img: video.img,
        url: video.url,
        idComment: video.idComment,
        idChannel: video.idChannel,
        idCategorie: video.idCategorie,
    });
}

function deleteVideo(id: string) {
    return VideosModel.VideosModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllVideos,
    getVideoById,
    getVideoByChannelId,
    getVideoByCategoryId,
    addVideo,
    updateVideo,
    deleteVideo,
};