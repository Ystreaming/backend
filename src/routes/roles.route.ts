import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /Role

router.get('/', (req: Request, res: Response) => {
    console.log('GET /roles');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /roles');
});

// => /Role/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /roles/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /roles/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /roles/:id');
});

module.exports = router;
