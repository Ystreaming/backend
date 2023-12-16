import { body } from 'express-validator';

export const rolesValidator = [
    body('name')
        .isString()
        .isLength({ min: 3 }).withMessage('Role name should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Role name is required'),

    body('idUsers')
        .isArray()
        .exists()
];