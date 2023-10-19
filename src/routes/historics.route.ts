import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /historics');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /historics');
});

module.exports = router;
