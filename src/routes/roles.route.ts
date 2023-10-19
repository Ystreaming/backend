import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /roles');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /roles/:id');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /roles');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /roles/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /roles/:id');
});

module.exports = router;
