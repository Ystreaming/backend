import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Historics API Endpoints', () => {
  let historicId: any;

  beforeAll(async () => {
    const newHistoric = {
      idUser: '5f8d0f7a5b4b9f2b7c7dce1a',
      idVideo: '5f8d0f7a5b4b9f2b7c7dce1a',
    };

    const response = await request(app).post('/historics').send(newHistoric);

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
          .send(newHistoric);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');

      await mongoose.model('Historics').deleteOne({ _id: response.body._id });
    });

    it('should not create a new historic with wrong data', async () => {
      const newHistoric = {
      };

      const response = await request(app)
          .post('/historics')
          .send(newHistoric);

      expect(response.statusCode).toBe(400);
    });
  });
});