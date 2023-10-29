import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /Comment

router.get('/', (req: Request, res: Response) => {
    console.log('GET /comments');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /comments');
});

// => /Comment/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /comments/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /comments/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /comments/:id');
});

// => /Comment/user/id

router.get('/user/:id', (req: Request, res: Response) => {
    console.log('GET /comments/user/:id');
});

// => /Comment/video/id

router.get('/video/:id', (req: Request, res: Response) => {
    console.log('GET /comments/video/:id');
});

module.exports = router;
