import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /User

router.get('/', (req: Request, res: Response) => {
    console.log('GET /users');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /users');
});

// => /User/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /users/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /users/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /users/:id');
});

// => /User/username/:username

router.get('/username/:username:', (req: Request, res: Response) => {
    console.log('GET /users/username/:username');
});

module.exports = router;
