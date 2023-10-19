import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /categories');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /categories/id');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /categories');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /categories/id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /categories/id');
});

module.exports = router;
