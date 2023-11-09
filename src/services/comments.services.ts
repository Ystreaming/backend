const CommentsModel = require('../models/comments.models');
const VideosCommentModel = require('../models/videos.models');
const UsersModel = require('../models/users.models');

function getAllComments() {
    return CommentsModel.CommentsModel.find();
}

function getCommentsById(id: string) {
    return CommentsModel.CommentsModel.findById(id);
}

function getCommentsByUserId(id: string) {
    return CommentsModel.CommentsModel.find({user_id: id});
}

function getCommentsByVideoId(id: string) {
    return CommentsModel.CommentsModel.find({video_id: id});
}

function addComment(comment: typeof CommentsModel) {
    const newComment = new CommentsModel.CommentsModel({
    });
    return newComment.save();
}

function updateComment(id: string, comment: typeof CommentsModel) {
    return CommentsModel.CommentsModel.findOneAndUpdate({ id: id }, {
    });
}

function deleteComment(id: string) {
    return CommentsModel.CommentsModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllComments,
    getCommentsById,
    getCommentsByUserId,
    getCommentsByVideoId,
    addComment,
    updateComment,
    deleteComment,
};