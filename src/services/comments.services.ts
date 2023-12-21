import CommentsModel from '../models/comments.models';
import Comment from '../interfaces/comments.interface';
import VideoModel from '../models/videos.models';

function getAllComments(skip: number, limit: number) {
    return CommentsModel.find()
        .populate({
            path: 'idUser',
            populate: {
                path: 'profileImage',
                model: 'Files',
            }
        })
        .skip(skip)
        .limit(limit);
}

function getCommentsById(id: string) {
    return CommentsModel.findById({ _id: id })
        .populate({
            path: 'idUser',
            populate: {
                path: 'profileImage',
                model: 'Files',
            }
        });
}

function getCommentsByUserId(id: string, skip: number, limit: number) {
    return CommentsModel.find({idUser: id})
        .populate({
            path: 'idUser',
            populate: {
                path: 'profileImage',
                model: 'Files',
            }
        })
        .skip(skip)
        .limit(limit);
}

function createComments(comment: Comment) {
    const newComment = new CommentsModel({
        texte: comment.texte,
        like: 0,
        dislike: 0,
        createdAt: new Date(),
        idUser: comment.idUser,
        idVideo: comment.idVideo,
    });
    VideoModel.findById(comment.idVideo).then((video) => {
        if (!video) {
            return;
        } else if (!video.idComment) {
          VideoModel.findByIdAndUpdate(comment.idVideo, {
            $set: { idComment: [newComment._id] }
          }).exec();
        } else {
          VideoModel.findByIdAndUpdate(comment.idVideo, {
            $push: { idComment: newComment._id }
          }).exec();
        }
      });
    return newComment.save();
}

function updateComment(id: string, comment: Comment) {
    return CommentsModel.findByIdAndUpdate(id, {
        texte: comment.texte,
        like: comment.like,
        dislike: comment.dislike,
        createdAt: comment.createdAt,
        idUser: comment.idUser,
    }, { new: true });
}

function deleteComment(id: string) {
    return CommentsModel.findOneAndDelete({ _id: id });
}

module.exports = {
    getAllComments,
    getCommentsById,
    getCommentsByUserId,
    createComments,
    updateComment,
    deleteComment,
};