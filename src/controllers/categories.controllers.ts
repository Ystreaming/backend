import { Request, Response } from 'express';
const CategoryService = require('../services/categories.service');

    async function getAllCategory(req: Request, res: Response) {
        try {
        const category = await CategoryService.getAllCategory();
        if (!category) {
            res.status(404).json({ message: 'Category not found' });
        } else {
            res.status(200).json(category);
        }
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        }
}
    async function updateCategory(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const category = await CategoryService.updateCategory(req.params.id, req.body);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            } else {
                return res.status(200).json(category);
            }
        }
}
    async function deleteCategory(req: Request, res: Response) {
        if (!Number.isInteger(parseInt(req.params.id))) {
            return res.status(400).json({ message: 'Id must be an integer' });
        } else {
            const category = await CategoryService.deleteCategory(req.params.id);

            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            } else {
                return res.status(200).json({ message: 'Category deleted' });
            }
        }
}
  module.exports = {
    getAllCategory,
    updateCategory,
    deleteCategory
};
