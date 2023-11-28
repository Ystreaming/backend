import { body } from 'express-validator';

export const filesValidator = [
    body('filename')
        .isString()
        .isLength({ min: 3 }).withMessage('filename should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('filename is required'),

    body('contentType')
        .isString()
        .isLength({ min: 3 }).withMessage('contentType should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('contentType is required'),

    body('length')
        .isNumeric()
        .exists()
        .notEmpty().withMessage('length is required'),

    body('chunkSize')
        .isNumeric()
        .exists()
        .notEmpty().withMessage('chunkSize is required'),

    body('aliases')
        .isString()
        .isLength({ min: 3 }).withMessage('aliases should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('aliases is required'),

    body('metadata')
        .isString()
        .isLength({ min: 3 }).withMessage('metadata should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('metadata is required'),

    body('md5')
        .isString()
        .isLength({ min: 3 }).withMessage('md5 should be at least 5 characters')
        .exists()
        .notEmpty().withMessage('md5 is required'),
];