const UserModel = require('../models/users.models');
const bcrypt = require('bcrypt');

const SALT_ROUND:number = 10;

async function createUser(user: typeof UserModel) {
    const hashPassword = await bcrypt.hash(user.password, SALT_ROUND);
    const newUser = new UserModel.UserModel({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        username: user.username,
        password: hashPassword,
        createdAt: new Date(),
        status: true,
        language: user.language,
        profileImage: user.profileImage,
    });
    return await newUser.save();
}

async function loginUser(email: string, password: string) {
    const user = await UserModel.UserModel.findOne({ email: email });
    if (!user) {
        throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Incorrect password');
    }
    return user;
}

function getAllUsers() {
    return UserModel.UserModel.find();
}

function getUserById(id: number) {
    return UserModel.UserModel.findOne({ id: id });
}

function getUserByUsername(username: string) {
    return UserModel.UserModel.findOne({ username: username });
}

async function updateUser(id: number, user: typeof UserModel) {
    const hashPassword = await bcrypt.hash(user.password, SALT_ROUND);
    return UserModel.UserModel.findOneAndUpdate({ id: id }, {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        username: user.username,
        password: hashPassword,
        language: user.language,
        profileImage: user.profileImage,
    });
}

function deleteUser(id: number) {
    return UserModel.UserModel.findOneAndDelete({ id: id });
}

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
};