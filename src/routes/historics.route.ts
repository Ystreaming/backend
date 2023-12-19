import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const historicController = require('../controllers/historics.controllers');

// => /historic

router.get('/', historicController.getAllHistoric);

router.post('/', historicController.createHistoric);

// => /historic/id

router.get('/:id', historicController.getHistoricById);


router.delete('/:id', historicController.deleteHistoric);

// => /historic/user/id

router.get('/user/:id', historicController.getHistoricByUserId);

module.exports = router;
