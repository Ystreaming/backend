import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    console.log('GET /channels');
});

router.get('/:id', (req: Request, res: Response) => {
    console.log('GET /channels/:id');
});

router.get('/:name', (req: Request, res: Response) => {
    console.log('GET /channels/:name');
});

router.post('/', (req: Request, res: Response) => {
    console.log('POST /channels');
});

router.put('/:id', (req: Request, res: Response) => {
    console.log('PUT /channels/:id');
});

router.delete('/:id', (req: Request, res: Response) => {
    console.log('DELETE /channels/:id');
});

module.exports = router;
