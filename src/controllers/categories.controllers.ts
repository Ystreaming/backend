import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
const CategoryService = require('../services/categories.services');
const fileService = require('../services/files.services');
import CategoryModel from '../models/categories.models';

async function getAllCategory(req: Request, res: Response) {
    /* #swagger.tags = ['Categories']
        #swagger.description = 'Endpoint to get all categories' */
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 50;
    const skip = (page - 1) * limit;

    try {
        const categories = await CategoryService.getAllCategory(skip, limit);
        const totalCategories = await CategoryModel.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        if (categories.length === 0) {
            res.status(204).json({ message: 'No categories found' });
        } else {
            res.status(200).json({
                categories,
                total: totalCategories,
                totalPages,
                currentPage: page
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function createCategory(req: Request, res: Response) {
    /* #swagger.tags = ['Categories']
        #swagger.description = 'Endpoint to create a new category' */

    /* #swagger.parameters['Category'] = {
            in: 'body',
            description: 'Category information',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Category" }
    } */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: 'Validation failed', details: errors.array() });
    }

    try {
        let categoryData = req.body;

        if (req.file) {
            const file = await fileService.createFile(req.file);
            categoryData.image = file._id;
        }

        const newCategory = await CategoryService.createCategory(categoryData);
        return res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function getCategoryById(req: Request, res: Response) {
    /* #swagger.tags = ['Categories']
        #swagger.description = 'Endpoint to get categories by id' */
    try {
        const category = await CategoryService.getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json(category);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function updateCategory(req: Request, res: Response) {
    /* #swagger.tags = ['Categories']
        #swagger.description = 'Endpoint to update categories by id' */
    try {
        let categoryData = req.body;

        if (req.file) {
            const file = await fileService.createFile(req.file);
            categoryData.image = file._id;
        }

        const category = await CategoryService.updateCategory(req.params.id, categoryData);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json(category);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function deleteCategory(req: Request, res: Response) {
    /* #swagger.tags = ['Categories']
        #swagger.description = 'Endpoint to delete categories by id' */
    try {
        const category = await CategoryService.deleteCategory(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        } else {
            return res.status(200).json({ message: 'Category deleted' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

  module.exports = {
    getAllCategory,
    updateCategory,
    createCategory,
    getCategoryById,
    deleteCategory
};
