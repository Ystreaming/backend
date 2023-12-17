import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('User API Endpoints', () => {
    let userId: any;

    beforeAll(async () => {
        const newUser = {
            username: 'testUser',
            password: 'password123',
            email: 'test@example.com',
            dateOfBirth: '1990-01-01',
        };

        const response = await request(app)
            .post('/users')
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        userId = response.body._id;
    });

    afterAll(async () => {
        await mongoose.model('Users').deleteOne({ _id: userId });
    });

    describe('POST /users', () => {
        it('should create a new user', async () => {
            const newUser = {
                username: 'newTestUser',
                password: 'password123',
                email: 'newtest@example.com',
                dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');
            await mongoose.model('Users').deleteOne({ _id: response.body._id });
        });

        it('should return 500', async () => {
          const newUser = {
          };

          const response = await request(app)
              .post(`/users/`)
              .send(newUser);

          expect(response.statusCode).toBe(500);
          expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            const response = await request(app).get('/users');

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('users');
        });
    });

    describe('GET /users/:id', () => {
        it('should get user by id', async () => {
            const response = await request(app).get(`/users/${userId}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('_id', userId);
        });

        it('should return 404', async () => {
          const response = await request(app).get(`/users/6565bf4d9e0f94bc9b5a5976`);

          expect(response.statusCode).toBe(404);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update user by id', async () => {
            const response = await request(app)
                .put(`/users/${userId}`)
                .send({
                    username: 'updatedTestUser',
                    password: 'password123',
                    email: 'test@example.com',
                    dateOfBirth: '1990-01-01',
                });

            expect(response.statusCode).toBe(200);

            const updatedUser = await request(app).get(`/users/${userId}`);

            expect(updatedUser.body).toHaveProperty('username', 'updatedTestUser');
        });

        it('should return 404', async () => {
          const newUser = {
              username: 'newTestUser',
              password: 'password123',
          };

          const response = await request(app)
              .put(`/users/6565bf4d9e0f94bc9b5a5976`)
              .send(newUser);

          expect(response.statusCode).toBe(404);
          expect(response.body).toHaveProperty('message', 'User not found');
        });

        it('should return Password is required', async () => {
          const newUser = {
          };

          const response = await request(app)
              .put(`/users/${userId}`)
              .send(newUser);

          expect(response.statusCode).toBe(400);
          expect(response.body).toHaveProperty('message', 'Password is required');
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete user by id', async () => {
            const response = await request(app).delete(`/users/${userId}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'User deleted successfully');
        });

        it('should have 404', async () => {
          const response = await request(app).delete(`/users/6565bf4d9e0f94bc9b5a5976`);

          expect(response.statusCode).toBe(404);
          expect(response.body).toHaveProperty('message', 'User not found');
      });

      it('should return 500', async () => {
        const response = await request(app)
            .delete(`/users/{sejflsfn}`)

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message', 'Internal Server Error');
      });
    });

    describe('GET /users/username/:username', () => {
      it('should get user by username', async () => {
          const newUser = {
              username: 'newTestUser',
              password: 'password123',
              email: 'test@exemple.com',
              dateOfBirth: '1990-01-01',
          };

          const response = await request(app)
              .post('/users')
              .send(newUser);

          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty('_id');

          const userResponse = await request(app).get('/users/username/newTestUser');

          expect(userResponse.statusCode).toBe(200);
          expect(userResponse.body).toHaveProperty('user');
          expect(userResponse.body.user).toBeInstanceOf(Array);
          expect(userResponse.body.user[0]).toHaveProperty('username', 'newTestUser');

          await mongoose.model('Users').deleteOne({ _id: response.body._id });
      });

      it('should return error 404', async () => {
        const newUser = {
            username: 'newTestUser',
            password: 'password123',
            email: 'test@exemple.com',
            dateOfBirth: '1990-01-01',
        };

        const response = await request(app)
            .post('/users')
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');

        const userResponse = await request(app).get('/users/username/blabla');

        expect(userResponse.statusCode).toBe(404);

        await mongoose.model('Users').deleteOne({ _id: response.body._id });
      });
    });

    describe('GET /users/sub/:id', () => {
      it('should return no content if user doesnt have sub', async () => {
          const newUser = {
              username: 'newTestUser',
              password: 'password123',
              email: 'test@example.com',
              dateOfBirth: '1990-01-01',
          };

          const response = await request(app)
              .post('/users')
              .send(newUser);

          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty('_id');

          const userResponse = await request(app).get(`/users/sub/${response.body._id}`);

          expect(userResponse.statusCode).toBe(404);

          await mongoose.model('Users').deleteOne({ _id: response.body._id });
      });

      it('should sub by userId', async () => {
        const newUser = {
            username: 'newTestUser2',
            password: 'password123',
            email: 'test@example.com',
            dateOfBirth: '1990-01-01',
            sub: "sub1, sub2, sub3",
        };

        const response = await request(app)
            .post('/users')
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');

        const userResponse = await request(app).get(`/users/sub/${response.body._id}`);

        expect(userResponse.statusCode).toBe(200);
        expect(userResponse.body.subItems).toEqual("sub1, sub2, sub3");

        await mongoose.model('Users').deleteOne({ _id: response.body._id });
      });
    });

    describe('POST /users/login', () => {
        process.env.JWT_SECRET = 'jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA';
        it('should login user', async () => {
            const newUser = {
                username: 'newTestUser',
                password: 'password123',
                email: 'test@example.com',
                dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const userResponse = await request(app).post('/users/login').send({
              username: 'newTestUser',
              password: 'password123',
            });

            expect(userResponse.statusCode).toBe(200);

            await mongoose.model('Users').deleteOne({ _id: response.body._id });
        });

        it('should return 400', async () => {
          const newUser = {
              username: 'newTestUser',
              password: 'password123',
              email: 'test@example.com',
              dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const userResponse = await request(app).post('/users/login').send({
              username: 'newTestUser',
            });

            expect(userResponse.statusCode).toBe(400);
            expect(userResponse.body).toHaveProperty('message', 'username and password are required');

            await mongoose.model('Users').deleteOne({ _id: response.body._id });
        });
    });
});