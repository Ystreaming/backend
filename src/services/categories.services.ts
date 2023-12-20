import CategoriesModel from '../models/categories.models';
import Categories from '../interfaces/categories.interface';

function getAllCategory(skip: number, limit: number) {
    return CategoriesModel.find()
        .populate('image')
        .skip(skip)
        .limit(limit);
}

function getCategoryById(id: string) {
    return CategoriesModel.findOne({ _id: id })
        .populate('image');
}

function createCategory(category: Categories) {
    const newCategory = new CategoriesModel({
        name: category.name,
        image: category.image,
    });
    return newCategory.save();
}

function updateCategory(id: string, category: Categories) {
    return CategoriesModel.findOneAndUpdate({ _id: id }, {
        name: category.name,
        image: category.image,
    });
}

function deleteCategory(id: string) {
    return CategoriesModel.findOneAndDelete({ _id: id });
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
};