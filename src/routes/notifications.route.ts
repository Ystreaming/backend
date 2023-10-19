import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /notifications');
});

router.get('/users/:id', (req: Request, res: Response) => {
    console.log('GET /users/:id');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /notifications');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /notifications/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /notifications/:id');
});

module.exports = router;
