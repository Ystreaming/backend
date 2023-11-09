import VideosModel from '../models/videos.models';
import Videos from '../interfaces/videos.interface';

function getAllVideos() {
    return VideosModel.find();
}

function getVideoById(id: string) {
    return VideosModel.findById({ _id: id });
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
        like: 0,
        dislike: 0,
        description: video.description,
        language: video.language,
        time: video.time,
        img: video.img,
        url: video.id,
        urllocal: video.urllocal,
        idComment: null,
        idChannel: video.idChannel,
        idCategory: video.idCategory,
    });
    return newVideo.save();
}

function updateVideo(id: string, video: Videos) {
    return VideosModel.findOneAndUpdate({ _id: id }, {
        title: video.title,
        created_at: new Date(),
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
    getAllVideos,
    getVideoById,
    getVideoByChannelId,
    getVideoByCategoryId,
    addVideo,
    updateVideo,
    deleteVideo,
};