import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const historicController = require('../controllers/historics.controllers');
const { isAuthenticated } = require('../middlewares/users.middleware');

// => /historic

router.get('/', isAuthenticated, historicController.getAllHistoric);

router.post('/', isAuthenticated, historicController.createHistoric);

// => /historic/id

router.get('/:id', isAuthenticated, historicController.getHistoricById);


router.delete('/:id', isAuthenticated, historicController.deleteHistoric);

// => /historic/user/id

router.get('/user/:id', isAuthenticated, historicController.getHistoricByUserId);

module.exports = router;
