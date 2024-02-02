import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import path from 'path';
import jwt from 'jsonwebtoken';

describe('Channels API Endpoints', () => {
  let channelId: string;
  let userId: string;
  let categoriesId: string;
  let testAuthToken: string;
  let JWT_SECRET: string = "jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA";

  beforeAll(async () => {
    const testUser = { _id: 'user_test_id', email: 'test@example.com' };
    testAuthToken = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });
    const newUser = {
      username: 'testUser',
      password: 'password123',
      email: 'test@example.com',
      dateOfBirth: '1990-01-01',
    };

    const userRes = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newUser);

    userId = userRes.body._id;

    const newCategory = {
      name: 'Test Category',
      image: '6565fcf55c7d8a60ff6742cb'
    };

    const categoryRes = await request(app)
      .post('/category')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newCategory);

    categoriesId = categoryRes.body._id;

    const newChannel = {
      name: 'Test Channel',
      description: 'Test Channel Description',
      idCategory: categoriesId,
      idUser: userId,
      image: '6565fcf55c7d8a60ff6742cb',
      idVideo: '6565fcf55c7d8a60ff6742cb'
    };

    const res = await request(app)
      .post('/channels')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newChannel);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      channelId = res.body._id;
  });

  afterAll(async () => {
    await mongoose.model('Channels').deleteOne({ _id: channelId });
  });

  describe('GET /channels', () => {
    it('should get all channels', async () => {
      const res = await request(app).get('/channels').set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('_id');
    });
  });

  describe('GET /channels/:id', () => {
    it('should get one channel', async () => {
      const res = await request(app).get(`/channels/${channelId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should not get one channel with wrong id', async () => {
      const res = await request(app).get(`/channels/123`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('message', 'Internal Server Error');
    });

    it('should return 204 if channel not found', async () => {
      const res = await request(app).get(`/channels/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('POST /channels', () => {
    it('should create a new channel', async () => {
      const newChannel = {
        name: 'Test Channel',
        description: 'Test Channel Description',
        idCategory: categoriesId,
        idUser: userId,
        image: '6565fcf55c7d8a60ff6742cb',
        idVideo: '6565fcf55c7d8a60ff6742cb'
      };

      const res = await request(app)
        .post('/channels')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newChannel);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');

      await mongoose.model('Channels').deleteOne({ _id: res.body._id });
    });

    it('should not create a new channel with wrong data', async () => {
      const newChannel = {
        name: 'Test Channel',
        description: 'Test Channel Description',
      };

      const res = await request(app)
        .post('/channels')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newChannel);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'idUser, idVideo are required');
    });

    it('should add file to channel', async () => {
      const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');

      const res = await request(app)
        .post('/channels')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .attach('image', filePath)
        .field('name', 'Test Channel')
        .field('description', 'Test Channel Description')
        .field('idCategory', categoriesId)
        .field('idUser', userId)
        .field('idVideo', '6565fcf55c7d8a60ff6742cb');

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
    });
  });

  describe('PUT /channels/:id', () => {
    it('should update a channel', async () => {
      const newChannel = {
        name: 'Test Channel 2',
        description: 'Test Channel Description',
        idCategory: categoriesId,
        idUser: userId,
        image: '6565fcf55c7d8a60ff6742cb',
        idVideo: '6565fcf55c7d8a60ff6742cb'
      };

      const res = await request(app)
        .put(`/channels/${channelId}`)
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newChannel);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should return 500', async () => {
      const newChannel = {
        name: 'Test Channel',
        description: 'Test Channel Description',
        idCategory: categoriesId,
        idUser: userId,
        image: '6565fcf55c7d8a60ff6742cb',
        idVideo: '6565fcf55c7d8a60ff6742cb'
      };

      const res = await request(app)
        .put(`/channels/6565fcf55c7d8a60ff6742cb`)
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newChannel);

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /channels/user/:id', () => {
    it('should get all channels by user', async () => {
      const res = await request(app).get(`/channels/user/${userId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should return 204 if channel not found', async () => {
      const res = await request(app).get(`/channels/user/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });

    it('should return 500', async () => {
      const res = await request(app).get(`/channels/user/123`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /channels/search/:name', () => {
    it('should search a channel by name', async () => {
      const res = await request(app).get(`/channels/search/Test`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should return 204 if channel not found', async () => {
      const res = await request(app).get(`/channels/search/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('GET /channels/category/:id', () => {
    it('should get all channels by category', async () => {
      const res = await request(app).get(`/channels/category/${categoriesId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should return 204 if channel not found', async () => {
      const res = await request(app).get(`/channels/category/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('GET /channels/view/:id', () => {
    it('should return 204 if channel not found', async () => {
      const res = await request(app).get(`/channels/view/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('GET /channels/like/:id', () => {
    it('should return 204 if channel not found', async () => {
      const res = await request(app).get(`/channels/like/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('DELETE /channels/:id', () => {
    it('should delete a channel', async () => {
      const res = await request(app).delete(`/channels/${channelId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should return 204', async () => {
      const res = await request(app).delete(`/channels/6565fcf55c7d8a60ff6742cb`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });

    it('should return 500', async () => {
      const res = await request(app).delete(`/channels/123`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(500);
    });

    it('should return 204 if no channel found', async () => {
      await mongoose.model('Channels').deleteMany({});
      const res = await request(app).get('/channels').set('Authorization', `Bearer ${testAuthToken}`);

      expect(res.statusCode).toEqual(204);
    });
  });
});