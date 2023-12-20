import FileModel from '../models/files.models';
import File from '../interfaces/files.interface';

function getAllFiles(skip: number, limit: number) {
    return FileModel.find()
        .skip(skip)
        .limit(limit);
}

function getFileById(id: string) {
    return FileModel.findOne({ _id: id });
}

function createFile(file: File) {
    const newFile = new FileModel({
        filename: file.filename,
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        path: file.path,
        size: file.size,
    });
    return newFile.save();
}

function updateFile(file: File) {
    return FileModel.findOneAndUpdate({ _id: file._id }, {
        filename: file.filename,
        fieldname: file.fieldname,
        originalname: file.originalname,
        encoding: file.encoding,
        mimetype: file.mimetype,
        destination: file.destination,
        path: file.path,
        size: file.size,
    });
}

function deleteFile(id: string) {
    return FileModel.findOneAndDelete({ _id: id });
}

module.exports = {
    getAllFiles,
    getFileById,
    createFile,
    updateFile,
    deleteFile,
};