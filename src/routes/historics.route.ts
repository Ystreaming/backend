import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /historics');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /historics/:id');
});

router.get('/user/:id', (req: Request, res: Response) => {
    console.log('GET /historics/user/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /historics/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /historics/:id');
});

module.exports = router;
