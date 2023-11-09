import CategoriesModel from '../models/categories.models';
import Categories from '../interfaces/categories.interface';

function getAllCategories() {
    return CategoriesModel.find();
}

function getCategoryById(id: string) {
    return CategoriesModel.findOne({ _id: id });
}

function getCategoryByName(name: string) {
    return CategoriesModel.findOne({ name: name });
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
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
};