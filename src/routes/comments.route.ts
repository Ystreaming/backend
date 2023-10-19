import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /comments');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /comments');
});

module.exports = router;
