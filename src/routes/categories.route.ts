import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { categoryValidator } = require('../validators/categories.validator');
const categoryController = require('../controllers/categories.controllers');

// => /Categories
router.get('/', categoryController.getAllCategories);

router.post('/', categoryValidator, categoryController.createCategory);

// => /Categories/id
router.get('/:id', categoryController.getCategoryById);

router.put('/:id', categoryValidator, categoryController.updateCategory);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
