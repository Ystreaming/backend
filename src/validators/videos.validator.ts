import { body } from 'express-validator';

export const videoValidator = [

    body('title')
        .isString()
        .isLength({ min: 3 }).withMessage('Title should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('Title is required'),

    body('like')
        .isNumeric()
        .exists()
        .notEmpty().withMessage('Like is required'),

    body('dislike')
        .isNumeric()
        .exists()
        .notEmpty().withMessage('Dislike is required'),

    body('description')
        .isString()
        .isLength({ min: 10 }).withMessage('Description should be at least 10 characters')
        .exists()
        .notEmpty().withMessage('Description is required'),

    body('time')
        .isNumeric().withMessage('Invalid date')
        .exists()
        .notEmpty().withMessage('time is required'),

    body('url')
        .isString()
        .isLength({ min: 10 }).withMessage('url should be at least 10 characters')
        .exists()
        .notEmpty().withMessage('url is required'),

    body('urllocal')
        .isString()
        .isLength({ min: 10 }).withMessage('urllocal should be at least 10 characters')
        .exists()
        .notEmpty().withMessage('urllocal is required'),
];