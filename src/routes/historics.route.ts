import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { historicValidator } = require('../validators/historics.validator');
const historicController = require('../controllers/historics.controllers');

// => /historic

router.get('/', historicController.getAllHistoric);

router.post('/', historicValidator, historicController.createHistoric);

// => /historic/id

router.get('/:id', historicController.getHistoricById);


router.delete('/:id', historicController.deleteHistoric);

// => /historic/user/id

router.get('/user/:id', (req: Request, res: Response) => {
    console.log('GET /historics/user/:id');
});

module.exports = router;
