import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /Category
router.get('/', (req: Request, res: Response) => {
    console.log('GET /categories');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /categories');
});

// => /Category/id
router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /categories/id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /categories/id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /categories/id');
});

module.exports = router;
