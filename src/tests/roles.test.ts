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

  describe('GET /roles/:id', () => {
    it('should get role by id', async () => {
      const response = await request(app)
          .get(`/roles/${roleId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });

    it('should not get role by id with wrong id', async () => {
      const response = await request(app)
          .get('/roles/123');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });

    it('should return 404 if role not found', async () => {
      const response = await request(app)
          .get('/roles/60c2c9b5c7e6b42d9c2c4c8e');

      expect(response.statusCode).toBe(204);
    });
  });

  describe('PUT /roles/:id', () => {
    it('should update role by id', async () => {
      const newRole = {
        name: 'Admin',
        permission: ['ADMIN'],
      };

      const response = await request(app)
          .put(`/roles/${roleId}`)
          .send(newRole);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });

    it('should not update role by id with wrong id', async () => {
      const newRole = {
        name: 'Admin',
        permission: ['ADMIN'],
      };

      const response = await request(app)
          .put('/roles/123')
          .send(newRole);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });

    it('should not update role by id with wrong data', async () => {
      const newRole = {
      };

      const response = await request(app)
          .put(`/roles/${roleId}`)
          .send(newRole);

      expect(response.statusCode).toBe(400);
    });

    it('should return 404 if role not found', async () => {
      const newRole = {
        name: 'Admin',
        permission: ['ADMIN'],
      };

      const response = await request(app)
          .put('/roles/60c2c9b5c7e6b42d9c2c4c8e')
          .send(newRole);

      expect(response.statusCode).toBe(404);
    });
  });

  describe('DELETE /roles/:id', () => {
    it('should delete role by id', async () => {
      const response = await request(app)
          .delete(`/roles/${roleId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id');
    });

    it('should not delete role by id with wrong id', async () => {
      const response = await request(app)
          .delete('/roles/123');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message', 'Internal Server Error');
    });

    it('should return 404 if role not found', async () => {
      const response = await request(app)
          .delete('/roles/60c2c9b5c7e6b42d9c2c4c8e');

      expect(response.statusCode).toBe(204);
    });

    it('Should return 204 if no role found', async () => {
      await mongoose.model('Roles').deleteMany({});

      const response = await request(app)
          .delete(`/roles/${roleId}`);

      expect(response.statusCode).toBe(204);
    });
  });
});