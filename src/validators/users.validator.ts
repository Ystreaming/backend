import { body } from 'express-validator';

export const userValidator = [
  body('firstName')
    .isString()
    .isLength({ min: 3 }).withMessage('Fistname should be at least 5 characters')
    .exists()
    .notEmpty().withMessage('First name is required'),

  body('lastName')
    .isString()
    .isLength({ min: 3 }).withMessage('Lastname should be at least 5 characters')
    .exists()
    .notEmpty().withMessage('Last name is required'),

  body('email')
    .isEmail().withMessage('Invalid email')
    .exists()
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isString()
    .isLength({ min: 10 }).withMessage('Password should be at least 10 characters')
    .exists()
    .notEmpty().withMessage('Password is required'),

  body('username')
    .isString()
    .isLength({ min: 5 }).withMessage('Username should be at least 5 characters')
    .exists()
    .notEmpty().withMessage('Username is required'),

  body('dateOfBirth')
    .isDate().withMessage('Invalid date')
    .exists()
    .notEmpty().withMessage('Date of birth is required'),

  body('language')
    .isString()
    .isLength({ min: 2 }).withMessage('Language should be at least 2 characters')
    .exists()
    .isLocale().withMessage('Invalid language')
    .notEmpty().withMessage('Language is required'),

  body('profileImage')
    .isString()
    .exists()
    .notEmpty().withMessage('Profile image is required'),
];