import { body } from 'express-validator';

export const channelValidator = [

    body('name')
        .isString()
        .isLength({ min: 3 }).withMessage('Name should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Name is required'),

    body('description')
        .isString()
        .isLength({ min: 3 }).withMessage('Description should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Description is required'),
];