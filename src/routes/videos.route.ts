import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /videos');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /videos/:id');
});

router.get('/channel/:id', (req: Request, res: Response) => {
    console.log('GET /videos/channel/:id');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /videos');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /videos/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /videos/:id');
});

module.exports = router;
