import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

// => /Channel
router.get('/', (req: Request, res: Response) => {
    console.log('GET /channels');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /channels');
});

// => /Channel/id

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /channels/:id');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /channels/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /channels/:id');
});

// => /Channel/name

router.get('/:name', (req: Request, res: Response) => {
    console.log('GET /channels/:name');
});

// => /Channel/category/id

router.get('/category/:id', (req: Request, res: Response) => {
    console.log('GET /channels/category/:id');
});

// => /Channel/user/name

router.get('/user/:name', (req: Request, res: Response) => {
    console.log('GET /channels/user/:name');
});

module.exports = router;
