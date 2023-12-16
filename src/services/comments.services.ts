import CommentsModel from '../models/comments.models';
import Comment from '../interfaces/comments.interface';

function getAllComments() {
    return CommentsModel.find();
}

function getCommentsById(id: string) {
    return CommentsModel.findById({ _id: id });
}

function getCommentsByUserId(id: string) {
    return CommentsModel.find({idUser: id});
}

function createComments(comment: Comment) {
    const newComment = new CommentsModel({
        texte: comment.texte,
        like: 0,
        dislike: 0,
        createdAt: new Date(),
        idUser: comment.idUser,
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