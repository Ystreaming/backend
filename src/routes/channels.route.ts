import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /channels');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /channels');
});

module.exports = router;
