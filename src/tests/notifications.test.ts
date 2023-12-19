import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Notifications API Endpoints', () => {
  let notificationId: string;

  beforeAll(async () => {
    const newNotification = {
      title: 'Test notification',
      description: 'Test notification description',
      url: 'http://www.localhost:3000/lien/',
      type: 'test',
      idUser: '5f8d0c9c8d8b8c4a6c9d9c9d',
    };

    const response = await request(app)
      .post('/notifications')
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
        .send(newNotification);

      expect(response.statusCode).toBe(400);
    });
  });
});