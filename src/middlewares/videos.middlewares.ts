import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');
const secretKey = 'votre_secret_key';



function authenticateJWT(req: Request, res: Response, next: NextFunction ) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Non authentifié' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Non authentifié' });
        }

        req.user = user;
        next();
    });
}

function getAllVideosMiddleware(req, res, next) {
    VideosModel.getAllVideos()
        .then(videos => {
            res.json(videos);
        })
        .catch(error => {
            res.status(500).json({ message: 'Erreur lors de la récupération des vidéos' });
        });
    }

module.exports = {
    authenticateJWT,
    getAllVideosMiddleware,
};
