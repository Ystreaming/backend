import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Roles API Endpoints', () => {
  let roleId: any;

  beforeAll(async () => {
    const newRole = {
      name: 'Admin',
      permission: ['ADMIN'],
    };

    const response = await request(app).post('/roles').send(newRole);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    roleId = response.body._id;
  });

  afterAll(async () => {
    await mongoose.model('Roles').deleteOne({ _id: roleId });
  });

  describe('POST /roles', () => {
    it('should create a new role', async () => {
      const newRole = {
        name: 'Admin',
        permission: ['ADMIN'],
      };

      const response = await request(app)
          .post('/roles')
          .send(newRole);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      await mongoose.model('Roles').deleteOne({ _id: response.body._id });
    });

    it('should not create a new role with wrong data', async () => {
      const newRole = {
      };

      const response = await request(app)
          .post('/roles')
          .send(newRole);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /roles', () => {
    it('should get all roles', async () => {
      const response = await request(app)
          .get('/roles');

      expect(response.statusCode).toBe(200);
    });

    it('should get all roles with pagination', async () => {
      const response = await request(app)
          .get('/roles?page=1&limit=2');

      expect(response.statusCode).toBe(200);
    });
  });
});