import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { rolesValidator } = require('../validators/roles.validator');
const rolesController = require('../controllers/roles.controllers');

// => /Role

router.get('/', rolesController.getAllRoles);

// router.post('/', roleValidator, roleController.createRoles);

// => /Role/id

// router.get('/:id', roleController.getRolesById);

router.put('/:id', rolesValidator, rolesController.updateRoles);

router.delete('/:id', rolesController.deleteRoles);

module.exports = router;
