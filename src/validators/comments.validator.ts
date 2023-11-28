import { body } from 'express-validator';

export const commentsValidator = [

    body('texte')
        .isString()
        .isLength({ min: 3 }).withMessage('Texte should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Texte is required'),

    body('like')
        .isNumeric()
        .exists()
        .notEmpty().withMessage('Like is required'),

    body('dislike')
        .isNumeric()
        .exists()
        .notEmpty().withMessage('Dislike is required'),

    body('createdAt')
        .isDate().withMessage('Invalid date')
        .exists()
        .notEmpty().withMessage('Date of birth is required'),

    body('idUser')
        .isString()
        .isLength({ min: 3 }).withMessage('IdUser should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('IdUser is required'),
];