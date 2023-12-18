import { body } from 'express-validator';

export const commentsValidator = [

    body('texte')
        .isString()
        .isLength({ min: 3 }).withMessage('Texte should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Texte is required'),

    body('idUser')
        .isString()
        .isLength({ min: 3 }).withMessage('IdUser should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('IdUser is required'),
];