import { Request, Response } from 'express';
const RoleService = require('../services/roles.service');

    async function getAllRole(req: Request, res: Response) {
        try {
        const role = await RoleService.getAllRoles();
        if (!role) {
            res.status(404).json({ message: 'Role not found' });
        } else {
            res.status(200).json(role);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
}
    async function updateRole(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const role = await RoleService.updateRole(req.params.id, req.body);

            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            } else {
                return res.status(200).json(role);
            }
        }
}
    async function deleteRole(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const role = await RoleService.deleteRole(req.params.id);

            if (!role) {
                return res.status(404).json({ message: 'Role not found' });
            } else {
                return res.status(200).json({ message: 'Role deleted' });
            }
        }
}
  module.exports = {
    getAllRole,
    updateRole,
    deleteRole
};
