import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /notifications');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /notifications');
});

module.exports = router;
