import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { rolesValidator } = require('../validators/roles.validator');
const rolesController = require('../controllers/roles.controllers');
const { isAuthenticated } = require('../middlewares/users.middleware');

// => /Role

router.get('/', isAuthenticated, rolesController.getAllRoles);

router.post('/', isAuthenticated, rolesValidator, rolesController.createRoles);

// => /Role/id

router.get('/:id', rolesController.getRolesById);

router.put('/:id', isAuthenticated, rolesValidator, rolesController.updateRoles);

router.delete('/:id', isAuthenticated, rolesController.deleteRoles);

module.exports = router;
