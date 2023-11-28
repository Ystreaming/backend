import { body } from 'express-validator';

export const categoryValidator = [

    body('name')
        .isString()
        .isLength({ min: 3 }).withMessage('Name should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Name is required'),
];