import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { roleValidator } = require('../validators/roles.validator');
const roleController = require('../controllers/roles.controllers');

// => /Role

router.get('/', roleController.getAllRoles);

router.post('/', roleValidator, roleController.createRole);

// => /Role/id

router.get('/:id', roleController.getRoleById);

router.put('/:id', roleValidator, roleController.updateRole);

router.delete('/:id', roleController.deleteRole);

module.exports = router;
