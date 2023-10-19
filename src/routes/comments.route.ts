import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /comments');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /comments/:id');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /comments');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /comments/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /comments/:id');
});

module.exports = router;
