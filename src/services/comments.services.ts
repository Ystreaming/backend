const CommentsModel = require('../models/comments.model');
const VideosCommentModel = require('../models/videos.model');
const UsersModel = require('../models/users.model');

function getAllComments() {
    return CommentsModel.CommentsModel.find();
}

function getCommentsById(id: number) {
    return CommentsModel.CommentsModel.findById(id);
}

function getCommentsByUserId(id: number) {
    return CommentsModel.CommentsModel.find({user_id: id});
}

function getCommentsByVideoId(id: number) {
    return CommentsModel.CommentsModel.find({video_id: id});
}

function addComment(comment: typeof CommentsModel) {
    const newComment = new CommentsModel.CommentsModel({
    });
    return newComment.save();
}

function updateComment(id: number, comment: typeof CommentsModel) {
    return CommentsModel.CommentsModel.findOneAndUpdate({ id: id }, {
    });
}

function deleteComment(id: number) {
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