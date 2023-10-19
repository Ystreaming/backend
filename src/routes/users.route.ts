import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /users');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /users');
});

module.exports = router;
