import VideosModel from '../models/videos.models';
import Videos from '../interfaces/videos.interface';
import ChannelModel from '../models/channels.models';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

const uploadsDirectory = path.join(__dirname, '../../uploads/video');

function getAllVideos(skip: number, limit: number) {
    return VideosModel.find()
        .populate({
            path: 'idChannel',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate('img')
        .populate('url')
        .skip(skip);
}

function getVideoById(id: string) {
    return VideosModel.findByIdAndUpdate(
        { _id: id },
        { $inc: { view: 1 } },
        { new: true }
    )
    .populate({
        path: 'idChannel',
        populate: {
            path: 'image',
            model: 'Files',
        }
    })
    .populate({
        path: 'idCategory',
        populate: {
            path: 'image',
            model: 'Files',
        }
    })
    .populate('img')
    .populate('url');
}

function getVideoByChannelId(id: string) {
    return VideosModel.find({idChannel: id})
        .populate({
            path: 'idChannel',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate('img')
        .populate('url');
}

function getVideoByCategoryId(id: string) {
    return VideosModel.find({idCategory: id})
        .populate({
            path: 'idChannel',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate('img')
        .populate('url');
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
    ChannelModel.findById(video.idChannel)
        .then(channel => {
            if (!channel) {
                throw new Error('Channel not found');
            }

            if (!Array.isArray(channel.idVideos)) {
                channel.idVideos = [];
            }

            channel.idVideos.push(new mongoose.Types.ObjectId(newVideo._id));

            channel.save();
        });
    return newVideo.save();
}

function searchVideo(q: string) {
    const searchRegex = new RegExp('^' + q, 'i');

    return VideosModel.find({ title: searchRegex })
        .populate({
            path: 'idChannel',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate('img');
}

function searchVideoByCategory(id: string, skip: number, limit: number) {
    return VideosModel.find({ idCategory: id })
        .populate({
            path: 'idChannel',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate('img')
        .skip(skip)
        .limit(limit);
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
function getCommentsByVideoId(id: string) {
    return VideosModel.findById({ _id: id })
        .populate({
            path: 'idComment',
            populate: {
                path: 'idUser',
                populate: {
                    path: 'profileImage',
                    model: 'Files',
                }
            }
        })
        .select('idComment')
        .sort({ createdAt: -1 })
        .then(video => {
            if (!video) {
                throw new Error('Video not found');
            }
            return video.idComment;
        });
}

async function addCommentOnVideo(id: string, idComment: string) {
    const video = await VideosModel.findById(id);
    if (!video) {
        throw new Error('Video not found');
    }
    if (!Array.isArray(video.idComment)) {
        video.idComment = [];
    }
    video.idComment.push(new mongoose.Types.ObjectId(idComment));
    return await video.save();
}

function getRecommendVideo(limit: number) {
    return VideosModel.aggregate([
        { $sample: { size: limit } }
    ])
    .exec()
    .then(results => VideosModel.populate(results, [
        { path: 'idChannel', populate: { path: 'image', model: 'Files' } },
        { path: 'idCategory', populate: { path: 'image', model: 'Files' } },
        { path: 'img' }
    ]));
}

function getMostViewedVideos(limit: number, skip: number) {
    return VideosModel.find()
        .sort({ view: -1 })
        .populate({
            path: 'idChannel',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate({
            path: 'idCategory',
            populate: {
                path: 'image',
                model: 'Files',
            }
        })
        .populate('img')
        .skip(skip)
        .limit(limit);
};

async function findUserIdByChannelIdWithVideoId(id: string): Promise<Object | null> {
    try {
        const video = await VideosModel.findById(id)
            .populate({
                path: 'idChannel',
                populate: {
                    path: 'idUser',
                    model: 'Users',
                }
            })
            .exec();

        if (!video) {
            throw new Error('Video not found');
        }

        const channel = video.idChannel as any;
        const user = channel.idUser;
        return user;
    } catch (error) {
        console.error('Error in findUserIdByChannelIdWithVideoId:', error);
        throw error;
    }
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
    getCommentsByVideoId,
    addCommentOnVideo,
    getRecommendVideo,
    getMostViewedVideos,
    findUserIdByChannelIdWithVideoId
};
