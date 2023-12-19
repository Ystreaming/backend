import { body } from 'express-validator';

export const notificationsValidator = [
    body('title')
        .isString()
        .isLength({ min: 3 }).withMessage('Title should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Title is required'),

    body('description')
        .isString()
        .isLength({ min: 3 }).withMessage('Description should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Description is required'),

    body('url')
        .isURL().withMessage('Invalid url')
        .isString()
        .isLength({ min: 3 }).withMessage('Url should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Url is required'),

    body('type')
        .isString()
        .isLength({ min: 3 }).withMessage('Type should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Type is required'),

    body('idUser')
        .isString()
        .isLength({ min: 3 }).withMessage('IdUser should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('IdUser is required'),
];