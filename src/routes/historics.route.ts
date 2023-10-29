import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /historic

router.get('/', (req: Request, res: Response) => {
    console.log('GET /historics');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /historics');
});

// => /historic/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /historics/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /historics/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /historics/:id');
});

// => /historic/user/id

router.get('/user/:id', (req: Request, res: Response) => {
    console.log('GET /historics/user/:id');
});

module.exports = router;
