const CategoriesModel = require('../models/categories.model');

function getAllCategories() {
    return CategoriesModel.CategoriesModel.find();
}

function getCategoryById(id: number) {
    return CategoriesModel.CategoriesModel.findOne({ id: id });
}

function getCategoryByName(name: string) {
    return CategoriesModel.CategoriesModel.findOne({ name: name });
}

function createCategory(category: typeof CategoriesModel) {
    const newCategory = new CategoriesModel.CategoriesModel({
        name: category.name,
        image: category.image,
    });
    return newCategory.save();
}

function updateCategory(id: number, category: typeof CategoriesModel) {
    return CategoriesModel.CategoriesModel.findOneAndUpdate({ id: id }, {
        name: category.name,
        image: category.image,
    });
}

function deleteCategory(id: number) {
    return CategoriesModel.CategoriesModel.findOneAndDelete({ id: id });
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
};