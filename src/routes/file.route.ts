import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
import { uploadSingleFile, listFiles, checkFileExists, deleteFile } from '../middlewares/file.middleware';

// => /file
router.post('/', uploadSingleFile('file'), (req: Request, res: Response) => {
    if (req.file) {
        res.json({ filename: req.file.filename, url: `${req.protocol}://${req.get('host')}/files/${req.file.filename}` });
    } else {
        res.status(400).send('Bad request');
    }
});

router.get('/', listFiles, (req: Request, res: Response) => {
    res.json(req.filesList);
});

// => /file/id

router.get('/:id', checkFileExists, (req: Request, res: Response) => {
    if (req.filePath) {
        res.sendFile(req.filePath);
    } else {
        res.status(404).send('File not found');
    }
});

router.delete('/:id', checkFileExists, deleteFile, (req: Request, res: Response) => {
    res.json({ message: 'File deleted successfully' });
});


module.exports = router;