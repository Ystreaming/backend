import { Request, Response, NextFunction } from 'express';
import multer, { StorageEngine } from 'multer';
import fs from 'fs';
import path from 'path';
import rangeParser from 'range-parser';

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

// Middleware pour le streaming vidéo
function streamVideo(req: Request, res: Response) {
    const filePath = req.filePath as string;

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = rangeParser(fileSize, range);

        if (parts instanceof Array) {
            const start = parts[0].start;
            const end = parts[0].end;
            const chunksize = (end - start) + 1;

            const fileStream = fs.createReadStream(filePath, { start, end });
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };

            res.writeHead(206, headers);
            fileStream.pipe(res);
        } else {
            res.status(416).send('Range not satisfiable');
        }
    } else {
        const headers = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(res);
    }
}
// Middleware pour enregistrer une vidéo
function saveVideo(req: Request, res: Response, next: NextFunction) {
    const fieldName = 'video';
    const upload = uploadSingleVideo(fieldName);

    upload(req, res, (err: any) => {
        if (err) {
            return res.status(500).send({ message: 'Error uploading video' });
        }
        res.status(200).send({ message: 'Video saved successfully' });
    });
}

export {
    uploadSingleVideo,
    listVideo,
    checkVideoExists,
    deleteVideo,
    streamVideo,
    saveVideo,
};

