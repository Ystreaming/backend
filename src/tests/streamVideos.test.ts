import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { streamVideo } from '../tools/streamVideo';
const VideosService = require('../services/videos.services');
import fs from 'fs';
import path from 'path';

// Mocking du service videos
jest.mock('../services/videos.services');

// On configure un faux serveur express pour tester la route
const app = express();
app.use(bodyParser.json());
app.get('/stream/:id', streamVideo);

describe('Video Streaming API', () => {
  beforeEach(() => {
    // Pour réinitialiser les appels de notre mock entre chaque test
    jest.clearAllMocks();
  });

  it('should stream video successfully', async () => {
    // On simule la réponse du service videos pour getVideoById
    VideosService.getVideoById.mockResolvedValue({
      // On renvoie un objet avec une url vers un fichier vidéo
      url: { path: path.resolve('./src/tests/ressources/video_test.mp4') }
    });

    // On simule la présence du fichier vidéo
    fs.writeFileSync(path.resolve('./src/tests/ressources/video_test.mp4'), 'fake video content');

    // On appelle la route avec un id de vidéo que l'on veut streamer
    const res = await request(app).get('/stream/mockVideoId').set('Range', 'bytes=0-1023');

    expect(res.status).toBe(206);
    expect(res.headers['content-type']).toBe('video/mp4');
  });

  it('should handle range not satisfiable', async () => {
    // On simule la réponse du service videos pour getVideoById
    VideosService.getVideoById.mockResolvedValue({
      // On renvoie un objet avec une url vers un fichier vidéo
      url: { path: path.resolve('./src/tests/ressources/video_test.mp4') }
    });

    // On simule la présence du fichier vidéo
    fs.writeFileSync(path.resolve('./src/tests/ressources/video_test.mp4'), 'fake video content');

    // On simule ici une erreur dans la range
    const res = await request(app).get('/stream/mockVideoId').set('Range', 'bytes=2000-');

    expect(res.status).toBe(416);
  });

  it('should handle no range', async () => {
    // On simule la réponse du service videos pour getVideoById
    VideosService.getVideoById.mockResolvedValue({
      // On renvoie un objet avec une url vers un fichier vidéo
      url: { path: path.resolve('./src/tests/ressources/video_test.mp4') }
    });

    // On simule la présence du fichier vidéo
    fs.writeFileSync(path.resolve('./src/tests/ressources/video_test.mp4'), 'fake video content');

    // On simule ici une erreur dans la range
    const res = await request(app).get('/stream/mockVideoId');

    expect(res.status).toBe(206);
  });
});