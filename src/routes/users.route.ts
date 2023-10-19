import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /users');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /users/:id');
});

router.get('/username/:username:', (req: Request, res: Response) => {
    console.log('GET /users/username/:username');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /users');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /users/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /users/:id');
});

module.exports = router;
