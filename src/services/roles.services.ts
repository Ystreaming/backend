import RoleModel from '../models/roles.models';
import Role from '../interfaces/roles.interface';

function getAllRoles() {
    return RoleModel.find();
}

function getRoleById(id: String) {
    return RoleModel.findOne({ _id: id });
}

function getRoleByName(name: string) {
    return RoleModel.findOne({ name: name });
}

function createRole(role: Role) {
    const newRole = new RoleModel({
        name: role.name,
        permission: role.permission,
        idUsers: role.idUsers,
    });
    return newRole.save();
}

function updateRole(id: String, role: Role) {
    return RoleModel.findByIdAndUpdate(id, {
        name: role.name,
        permission: role.permission,
        idUsers: role.idUsers,
    }, { new: true });
}

function deleteRole(id: String) {
    return RoleModel.findByIdAndDelete(id);
}

export {
    getAllRoles,
    getRoleById,
    getRoleByName,
    createRole,
    updateRole,
    deleteRole,
};
