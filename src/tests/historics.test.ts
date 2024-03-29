import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

describe('Historics API Endpoints', () => {
  let historicId: any;
  let testAuthToken: string;
  let JWT_SECRET: string = "jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA";

  beforeAll(async () => {
    const testUser = { _id: 'user_test_id', email: 'test@example.com' };
    testAuthToken = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });
    const newUser = {
      name: 'Test',
      email: 'user@example.com',
    };

    const newHistoric = {
      idUser: '5f8d0f7a5b4b9f2b7c7dce1a',
      idVideo: '5f8d0f7a5b4b9f2b7c7dce1a',
    };

    const response = await request(app).post('/historics').set('Authorization', `Bearer ${testAuthToken}`).send(newHistoric);
    const responseUser = await request(app).post('/users').set('Authorization', `Bearer ${testAuthToken}`).send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    historicId = response.body._id;
  });

  afterAll(async () => {
    await mongoose.model('Historics').deleteOne({ _id: historicId });
  });

  describe('POST /historics', () => {
    it('should create a new historic', async () => {
      const newHistoric = {
        idUser: '5f8d0f7a5b4b9f2b7c7dce1a',
        idVideo: '5f8d0f7a5b4b9f2b7c7dce1a',
      };

      const response = await request(app)
          .post('/historics')
          .set('Authorization', `Bearer ${testAuthToken}`)
          .send(newHistoric);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');

      await mongoose.model('Historics').deleteOne({ _id: response.body._id });
    });
  });

  describe('GET /historics', () => {
    it('should get all historics', async () => {
      const response = await request(app).get('/historics').set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('historics');
    });

    it('should get a historic by id', async () => {
      const response = await request(app).get(`/historics/${historicId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });

    it('should not get a historic by id with wrong id', async () => {
      const response = await request(app).get('/historics/123').set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('GET /historics/:id', () => {
    it('should get a historic by id', async () => {
      const response = await request(app).get(`/historics/${historicId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });

    it('should not get a historic by id with wrong id', async () => {
      const response = await request(app).get('/historics/123').set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('GET /historics/user/:id', () => {
    it('should not get all historics by user id with wrong id', async () => {
      const response = await request(app).get('/historics/user/123').set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });
  });

  describe('PUT /historics/:id', () => {
    it('should return 404, because no route was found', async () => {
        const response = await request(app).put(`/historics/${historicId}`).set('Authorization', `Bearer ${testAuthToken}`);

        expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /historics/:id', () => {
    it('should delete a historic by id', async () => {
      const response = await request(app).delete(`/historics/${historicId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(200);
    });

    it('should not delete a historic by id with wrong id', async () => {
      const response = await request(app).delete('/historics/123').set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });

    it('should return 404 if historic not found', async () => {
      const deleteResponse = await mongoose.model('Historics').deleteMany({}).set('Authorization', `Bearer ${testAuthToken}`);

      const response = await request(app).get('/historics').set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(204);
    });

    it('should return 204 if no historic found for historics id', async () => {
      const deleteResponse = await mongoose.model('Historics').deleteMany({});

      const response = await request(app).get(`/historics/${historicId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(204);
    });

    it('should return 204 if no historic found for historics id', async () => {
      const deleteResponse = await mongoose.model('Historics').deleteMany({});

      const response = await request(app).delete(`/historics/${historicId}`).set('Authorization', `Bearer ${testAuthToken}`);

      expect(response.statusCode).toBe(204);
    });
  });
});