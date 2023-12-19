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

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024
  }
});

function uploadSingleVideo(fieldName: string) {
  return upload.single(fieldName);
}

function listVideo(req: Request, res: Response, next: NextFunction) {
  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      return res.status(500).send({ message: "Unable to scan files!" });
    }
    req.filesList = files.map(file => ({ name: file, url: `${req.protocol}://${req.get('host')}/files/${file}` }));
    next();
  });
}

function checkVideoExists(req: Request, res: Response, next: NextFunction) {
  const fileName = req.params.id;
  const filePath = path.join(uploadsDirectory, fileName);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send({ message: "File not found" });
  }

  req.filePath = filePath;
  next();
}

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
