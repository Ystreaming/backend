const RolesModel = require('../models/roles.model');

function getAllRoles() {
    return RolesModel.RolesModel.find();
}

function getRoleById(id: String) {
    return RolesModel.RolesModel.findOne({ id: id });
}

function getRoleByName(name: string) {
    return RolesModel.RolesModel.findOne({ name: name });
}

function createRole(role: typeof RolesModel) {
    const newRole = new RolesModel.RolesModel({
        name: role.name,
        permission: role.permission,
        idUser: role.idUser,
    });
    return newRole.save();
}

function updateRole(id: String, role: typeof RolesModel) {
    return RolesModel.RolesModel.findOneAndUpdate({ id: id }, {
        name: role.name,
        permission: role.permission,
        idUser: role.idUser,
    });
}

function deleteRole(id: String) {
    return RolesModel.RolesModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllRoles,
    getRoleById,
    getRoleByName,
    createRole,
    updateRole,
    deleteRole,
};