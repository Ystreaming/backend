import { Request, Response, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import fs from 'fs';
import path from 'path';

declare module 'express-serve-static-core' {
    interface Request {
      filesList?: { name: string; url: string }[];
      filePath?: string;
    }
  }

const uploadsDirectory = path.join(__dirname, '../../uploads/video');

const storage: StorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadsDirectory, { recursive: true });
        cb(null, uploadsDirectory);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Middleware pour l'upload d'un fichier
function uploadSingleVideo(fieldName: string) {
    return upload.single(fieldName);
}

// Middleware pour lister tous les fichiers
function listVideo(req: Request, res: Response, next: NextFunction) {
    fs.readdir(uploadsDirectory, (err, files) => {
        if (err) {
            return res.status(500).send({ message: "Unable to scan files!" });
        }
        req.filesList = files.map(file => ({ name: file, url: `${req.protocol}://${req.get('host')}/files/${file}` }));
        next();
    });
}

// Middleware pour vérifier si le fichier existe
function checkVideoExists(req: Request, res: Response, next: NextFunction) {
    const fileName = req.params.id;
    const filePath = path.join(uploadsDirectory, fileName);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: "File not found" });
    }

    req.filePath = filePath;
    next();
}

// Middleware pour supprimer un fichier
function deleteVideo(req: Request, res: Response, next: NextFunction) {
    const filePath = req.filePath as string;

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        next();
    });
}

export {
    uploadSingleVideo,
    listVideo,
    checkVideoExists,
    deleteVideo
};
