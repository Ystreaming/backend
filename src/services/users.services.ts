import UserModel from '../models/users.models';
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const SALT_ROUND:number = 10;

async function createUser(user: any) {
    const hashPassword = await bcrypt.hash(user.password, SALT_ROUND);
    const newUser = new UserModel({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        username: user.username,
        password: hashPassword,
        status: user.status,
        language: user.language,
        sub: [],
        profileImage: user.profileImage,
    });
    return await newUser.save();
}

async function loginUser(username: string, password: string) {
    const user = await UserModel.findOne({ username: username });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    return user;
}

function getAllUsers(page= 1, limit= 50) {
    return UserModel.find();
}

function getUserById(id: string) {
    return UserModel.findOne({ _id: id });
}

function getUserByUsername(username: string) {
    const searchRegex = new RegExp('^' + username, 'i');

    return UserModel.find({ username: { $regex: searchRegex } });
}

async function getSubByUser(userId: string, skip: number, limit: number) {
    return UserModel.findById(userId)
        .select('sub')
        .slice('sub', [skip, limit])
        .populate({
            path: 'sub',
            model: 'Channels',
            populate: {
                path: 'image',
                model: 'Files'
            }
        })
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }
            return user.sub;
        });
}

async function updateUser(id: string, userData: any) {
    const hashPassword = await bcrypt.hash(userData.password, SALT_ROUND);
    return UserModel.findOneAndUpdate({ _id: id }, {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth,
      username: userData.username,
      password: hashPassword,
      sub: userData.sub,
      language: userData.language,
      profileImage: userData.profileImage,
    });
}

function deleteUser(id: string) {
    return UserModel.findOneAndDelete({ _id: id });
}

function addSub(userId: string, channelId: string) {
    return UserModel.findById(userId)
        .then(user => {
            if (!user) {
                throw new Error('User not found');
            }

            if (!Array.isArray(user.sub)) {
                user.sub = [];
            }

            user.sub.push(new mongoose.Types.ObjectId(channelId));

            return user.save();
        });
}

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    getSubByUser,
    updateUser,
    deleteUser,
    addSub,
};