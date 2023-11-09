import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /Video

router.get('/', (req: Request, res: Response) => {
    console.log('GET /videos');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /videos');
});

// => /Video/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /videos/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /videos/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /videos/:id');
});

// => /Video/user/id

router.get('/channel/:id', (req: Request, res: Response) => {
    console.log('GET /videos/channel/:id');
});

module.exports = router;
