import { Request, Response } from 'express';
const RolesService = require('../services/roles.service');

async function getAllRoles(req: Request, res: Response) {
    try {
      const roles = await RolesService.getAllRoles();
      if (!roles) {
        res.status(404).json({ message: 'Role not found' });
      } else {
        res.status(200).json(roles);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
}
async function updateRoles(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const roles = await RolesService.updateRoles(req.params.id, req.body);

        if (!roles) {
            return res.status(404).json({ message: 'Role not found' });
        } else {
            return res.status(200).json(roles);
        }
    }
}
async function deleteRoles(req: Request, res: Response) {
    if (!Number.isInteger(parseInt(req.params.id))) {
        return res.status(400).json({ message: 'Id must be an integer' });
    } else {
        const roles = await RolesService.deleteUser(req.params.id);

        if (!roles) {
            return res.status(404).json({ message: 'Role not found' });
        } else {
            return res.status(200).json({ message: 'Role deleted' });
        }
    }
}
  module.exports = {
    getAllRoles,
    updateRoles,
    deleteRoles
};
