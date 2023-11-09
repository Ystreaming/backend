import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /Notification

router.get('/', (req: Request, res: Response) => {
    console.log('GET /notifications');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /notifications');
});

// => /Notification/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /notifications/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /notifications/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /notifications/:id');
});

// => /Notification/user/id

router.get('/users/:id', (req: Request, res: Response) => {
    console.log('GET /users/:id');
});

module.exports = router;
