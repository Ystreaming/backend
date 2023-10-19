import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const { Request, Response } = require('express');

function isAuthenticated(req: Request, res: Response, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Non authentifié' });
    }
}

router.get('/', isAuthenticated, (req: Request, res: Response) => {
    console.log('GET /users');
});

router.get('/:id', isAuthenticated, (req: Request, res: Response) => {
    console.log('GET /users/:id');
});

router.get('/username/:username', isAuthenticated, (req: Request, res: Response) => {
    console.log('GET /users/username/:username');
});

router.post('/', isAuthenticated, (req: Request, res: Response) => {
    console.log('POST /users');
});

router.put('/:id', isAuthenticated, (req: Request, res: Response) => {
    console.log('PUT /users/:id');
});

router.delete('/:id', isAuthenticated, (req: Request, res: Response) => {
    console.log('DELETE /users/:id');
});

module.exports = router;
