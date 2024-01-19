import request from 'supertest';
import app from '../app';
const VideosService = require('../services/videos.services')
import jwt from 'jsonwebtoken';
import path from 'path';
import mongoose from 'mongoose';

jest.mock('../services/videos.services');

describe('Video Streaming Route', () => {

  let videoId: any;
  let userId: any;
  let channelId: any;
  let categoryId: any;
  let testAuthToken: string;
  let JWT_SECRET: string = "jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA";

  beforeAll(async () => {
    const testUser = { _id: 'user_test_id', email: 'test@example.com' };
    testAuthToken = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });

    const newUser = {
      username: 'testUser',
      password: 'password123',
      email: 'test@exemple.com',
      dateOfBirth: '1990-01-01',
    };

    const userRes = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newUser);

    expect(userRes.statusCode).toEqual(201);
    userId = userRes.body._id;

    const newCategory = {
      name: 'testCategory',
      image: '6565fcf55c7d8a60ff6742cb',
    };

    const categoryRes = await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newCategory);

    expect(categoryRes.statusCode).toEqual(201);
    categoryId = categoryRes.body._id;

    const newChannel = {
      name: 'testChannel',
      description: 'testDescription',
      idCategory: categoryId,
      idUser: userId,
      image: '6565fcf55c7d8a60ff6742cb',
      idVideo: '6565fcf55c7d8a60ff6742cb',
    };

    const channelRes = await request(app)
      .post('/channels')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newChannel);

    expect(channelRes.statusCode).toEqual(201);
    channelId = channelRes.body._id;

    const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');
    const filePathVideo = path.resolve('./src/tests/ressources/video_test.mp4');

    const res = await request(app)
      .post('/videos')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .attach('img', filePath)
      .attach('url', filePathVideo)
      .field('title', 'testVideo')
      .field('view', 0)
      .field('like', 0)
      .field('dislike', 0)
      .field('description', 'testDescription')
      .field('language', 'testLanguage')
      .field('time', 1000)
      .field('urllocal', 'http://testUrlLocal.com/')
      .field('idChannel', channelId)
      .field('idCategory', categoryId);

      console.log(res)
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    videoId = res.body._id;
  });

  afterAll(async () => {
    await mongoose.model('Videos').deleteOne({ _id: videoId });
    await mongoose.model('Channels').deleteOne({ _id: channelId });
    await mongoose.model('Category').deleteOne({ _id: categoryId });
    await mongoose.model('Users').deleteOne({ _id: userId });
  });

  it('should stream the video successfully', async () => {
    console.log(videoId);
    console.log("dfghjkjhgcvghjk")
    const response = await request(app).get(`/stream/${videoId}`);

    expect(response.status).toBe(206);
    expect(response.headers['content-range']).toBeDefined();
    expect(response.headers['accept-ranges']).toBe('bytes');
    expect(response.headers['content-length']).toBeDefined();
    expect(response.headers['content-type']).toBe('video/mp4');
  });

  it('should handle errors when streaming', async () => {
    const response = await request(app).get(`/stream/${videoId}`);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Internal Server Error');
  });

  it('should handle not found video', async () => {
    VideosService.getVideoById.mockResolvedValue(null);

    const response = await request(app).get('/stream/65a923dae33e276d01fcde4dae');

    expect(response.status).toBe(404);
  });
});
