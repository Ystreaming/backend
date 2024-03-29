import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

describe('Notifications API Endpoints', () => {
  let notificationId: string;
  let testAuthToken: string;
  let JWT_SECRET: string = "jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA";

  beforeAll(async () => {
    const testUser = { _id: 'user_test_id', email: 'test@example.com' };
    testAuthToken = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });
    const newNotification = {
      title: 'Test notification',
      description: 'Test notification description',
      url: 'http://www.localhost:3000/lien/',
      type: 'test',
      idUser: '5f8d0c9c8d8b8c4a6c9d9c9d',
    };

    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `Bearer ${testAuthToken}`)
      .send(newNotification);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    notificationId = response.body._id;
  });

  afterAll(async () => {
    await mongoose.model('Notifications').deleteOne({ _id: notificationId });
  });

  describe('POST /notifications', () => {
    it('should create a new notification', async () => {
      const newNotification = {
        title: 'Test notification',
        description: 'Test notification description',
        url: 'http://www.localhost:3000/',
        type: 'test',
        idUser: '5f8d0c9c8d8b8c4a6c9d9c9d',
      };

      const response = await request(app)
        .post('/notifications')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newNotification);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      await mongoose.model('Notifications').deleteOne({ _id: response.body._id });
    });

    it('should not create a new notification with wrong data', async () => {
      const newNotification = {
      };

      const response = await request(app)
        .post('/notifications')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newNotification);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /notifications', () => {
    it('should get all notifications', async () => {
      const response = await request(app)
        .get('/notifications')
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('notifications');
    });
  });

  describe('GET /notifications/:id', () => {
    it('should get a notification by id', async () => {
      const response = await request(app)
        .get(`/notifications/${notificationId}`)
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });

    it('should not get a notification with wrong id', async () => {
      const response = await request(app)
        .get('/notifications/123')
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('DELETE /notifications/:id', () => {
    it('should delete a notification by id', async () => {
      const response = await request(app)
        .delete(`/notifications/${notificationId}`)
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
    });

    it('should not delete a notification with wrong id', async () => {
      const response = await request(app)
        .delete('/notifications/123')
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
    });

    it('Should return 204 if no notification found', async () => {
      await mongoose.model('Notifications').deleteOne({ _id: notificationId });

      const response = await request(app)
        .delete(`/notifications/${notificationId}`)
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(204);
    });
  });

  describe('GET /notifications/user/:id', () => {
    it('should get notifications by user id', async () => {
      const createNotification = {
        title: 'Test notification',
        description: 'Test notification description',
        url: 'http://www.localhost:3000/',
        type: 'test',
        idUser: '5f8d0c9c8d8b8c4a6c9d9c9d',
      };

      await request(app)
        .post('/notifications')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(createNotification);

      const response = await request(app)
        .get('/notifications/users/5f8d0c9c8d8b8c4a6c9d9c9d')
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('notification');
    });

    it('should return 204 if no notifications found', async () => {
      await mongoose.model('Notifications').deleteMany({ idUser: '5f8d0c9c8d8b8c4a6c9d9c9d' });
      const response = await request(app)
        .get('/notifications/users/5f8d0c9c8d8b8c4a6c9d9c9d')
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(204);
    });

    it('should not get notifications with wrong user id', async () => {
      const response = await request(app)
        .get('/notifications/users/123')
        .set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
    });
  });

  describe('Error handling', () => {
    it('should return 500 if error', async () => {
      const newNotification = {
        title: 'Test notification',
        description: 'Test notification description',
        url: 'http://www.localhost:3000/',
        type: 'test',
        idUser: '5f8d0c9c8d8b8c4a6c',
      };

      await mongoose.model('Notifications').deleteOne({ _id: notificationId });

      const response = await request(app)
        .post('/notifications')
        .set('Authorization', `Bearer ${testAuthToken}`)
        .send(newNotification);

      expect(response.statusCode).toBe(500);
    });
  });
});