import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
const path = require('path');
import jwt from 'jsonwebtoken';

describe('User API Endpoints', () => {
    let userId: any;
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

        const response = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${testAuthToken}`)
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
                .set('Authorization', `Bearer ${testAuthToken}`)
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
              .set('Authorization', `Bearer ${testAuthToken}`)
              .send(newUser);

          expect(response.statusCode).toBe(500);
          expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });

        it('Should add file to user', async () => {
            const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');

            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .attach('profileImage', filePath)
                .field('username', 'testUser')
                .field('password', 'password123')
                .field('email', 'test@example.com')
                .field('dateOfBirth', '1990-01-01')

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');
        });
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            const response = await request(app).get('/users').set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('users');
        });
    });

    describe('GET /users/:id', () => {
        it('should get user by id', async () => {
            const response = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('_id', userId);
        });

        it('should return 404', async () => {
          const response = await request(app).get(`/users/6565bf4d9e0f94bc9b5a5976`).set('Authorization', `Bearer ${testAuthToken}`);

          expect(response.statusCode).toBe(404);
        });

        it('should return 400', async () => {
            const response = await request(app).get(`/users/6565bf4d9e0f94bc9b5a597`).set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(400);
        });
    });

    describe('PUT /users/:id', () => {
        it('should update user by id', async () => {
            const response = await request(app)
                .put(`/users/${userId}`)
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send({
                    username: 'updatedTestUser',
                    password: 'password123',
                    email: 'test@example.com',
                    dateOfBirth: '1990-01-01',
                });

            expect(response.statusCode).toBe(200);

            const updatedUser = await request(app).get(`/users/${userId}`).set('Authorization', `Bearer ${testAuthToken}`);

            expect(updatedUser.body).toHaveProperty('username', 'updatedTestUser');
        });

        it('should return 404', async () => {
          const newUser = {
              username: 'newTestUser',
              password: 'password123',
          };

          const response = await request(app)
              .put(`/users/6565bf4d9e0f94bc9b5a5976`)
              .set('Authorization', `Bearer ${testAuthToken}`)
              .send(newUser);

          expect(response.statusCode).toBe(404);
          expect(response.body).toHaveProperty('message', 'User not found');
        });

        it('should return Password is required', async () => {
          const newUser = {
          };

          const response = await request(app)
              .put(`/users/${userId}`)
              .set('Authorization', `Bearer ${testAuthToken}`)
              .send(newUser);

          expect(response.statusCode).toBe(400);
          expect(response.body).toHaveProperty('message', 'Password is required');
        });

        it('should return 400', async () => {
            const newUser = {
            };

            const response = await request(app)
                .put(`/users/6565bf4d9e0f94bc9b5a5976`)
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(400);
            expect(response.body).toHaveProperty('message', 'Password is required');
        });
    });

    describe('DELETE /users/:id', () => {
        it('should delete user by id', async () => {
            const response = await request(app).delete(`/users/${userId}`).set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message', 'User deleted successfully');
        });

      it('should return 500', async () => {
        const response = await request(app)
            .delete(`/users/{sejflsfn}`)
            .set('Authorization', `Bearer ${testAuthToken}`);

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
              .set('Authorization', `Bearer ${testAuthToken}`)
              .send(newUser);

          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty('_id');

          const userResponse = await request(app).get('/users/username/newTestUser').set('Authorization', `Bearer ${testAuthToken}`);

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
            .set('Authorization', `Bearer ${testAuthToken}`)
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');

        const userResponse = await request(app).get('/users/username/blabla').set('Authorization', `Bearer ${testAuthToken}`);

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
              .set('Authorization', `Bearer ${testAuthToken}`)
              .send(newUser);

          expect(response.statusCode).toBe(201);
          expect(response.body).toHaveProperty('_id');

          const userResponse = await request(app).get(`/users/sub/${response.body._id}`).set('Authorization', `Bearer ${testAuthToken}`);

          expect(userResponse.statusCode).toBe(200);

          await mongoose.model('Users').deleteOne({ _id: response.body._id });
      });

      it('should return user not found', async () => {
        const userResponse = await request(app).get(`/users/sub/507f1f77bcf86cd799439011`).set('Authorization', `Bearer ${testAuthToken}`);

        expect(userResponse.statusCode).toBe(404);
        expect(userResponse.body).toHaveProperty('message', 'User not found');
      });

      it('should sub by userId', async () => {
        const UserChannel = {
            username: 'newTestUser',
            password: 'password123',
            email: 'user@example.com',
            dateOfBirth: '1990-01-01',
        };

        const UserChannelResponse = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${testAuthToken}`)
            .send(UserChannel);

        expect(UserChannelResponse.statusCode).toBe(201);
        expect(UserChannelResponse.body).toHaveProperty('_id');

        const newChannel = {
            name: 'newChannel',
            description: 'description',
            image: '507f1f77bcf86cd799439011',
            idUser: UserChannelResponse.body._id,
            idVideo: [],
        };

        const responseChannel = await request(app)
            .post('/channels')
            .set('Authorization', `Bearer ${testAuthToken}`)
            .send(newChannel);

        expect(responseChannel.statusCode).toBe(201);
        expect(responseChannel.body).toHaveProperty('_id');

        const newUser = {
            username: 'newTestUser2',
            password: 'password123',
            email: 'test@example.com',
            dateOfBirth: '1990-01-01',
        };

        const response = await request(app)
            .post('/users')
            .set('Authorization', `Bearer ${testAuthToken}`)
            .send(newUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');

        const userAddSub = await request(app).patch(`/users/sub/${response.body._id}`).send({ subId: responseChannel.body._id }).set('Authorization', `Bearer ${testAuthToken}`);

        expect(userAddSub.statusCode).toBe(200);

        const userResponse = await request(app).get(`/users/sub/${response.body._id}`).set('Authorization', `Bearer ${testAuthToken}`);

        expect(userResponse.statusCode).toBe(200);

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
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const userResponse = await request(app).post('/users/login').send({
              username: 'newTestUser',
              password: 'password123',
            })
            .set('Authorization', `Bearer ${testAuthToken}`);

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
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const userResponse = await request(app).post('/users/login').send({
              username: 'newTestUser',
            })
            .set('Authorization', `Bearer ${testAuthToken}`);

            expect(userResponse.statusCode).toBe(400);
            expect(userResponse.body).toHaveProperty('message', 'username and password are required');

            await mongoose.model('Users').deleteOne({ _id: response.body._id });
        });

        it('should return 404', async () => {
            const userResponse = await request(app).post('/users/login').send({
              username: 'newTestUser123',
              password: 'password1234',
            })
            .set('Authorization', `Bearer ${testAuthToken}`);

            expect(userResponse.statusCode).toBe(404);
            expect(userResponse.body).toHaveProperty('message', 'User not found');
        });

        it('should login user', async () => {
            const newUser = {
                username: 'newTestUser',
                password: 'password123',
                email: 'test@example.com',
                dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const userResponse = await request(app).post('/users/login').send({
              username: 'newTestUser',
              password: 'password1234',
            })
            .set('Authorization', `Bearer ${testAuthToken}`);

            expect(userResponse.statusCode).toBe(500);

            await mongoose.model('Users').deleteOne({ _id: response.body._id });
        });
    });

    describe('PATCH /users/sub/:id', () => {
        it('should add sub to user', async () => {
            const newUser = {
                username: 'newTestUser',
                password: 'password123',
                email: 'user@example.com',
                dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const newChannel = {
                name: 'newChannel',
                description: 'description',
                image: '507f1f77bcf86cd799439011',
                idUser: response.body._id,
                idVideo: [],
            };

            const responseChannel = await request(app)
                .post('/channels')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newChannel);

            expect(responseChannel.statusCode).toBe(201);
            expect(responseChannel.body).toHaveProperty('_id');

            const userAddSub = await request(app).patch(`/users/sub/${response.body._id}`).send({ subId: responseChannel.body._id }).set('Authorization', `Bearer ${testAuthToken}`);

            expect(userAddSub.statusCode).toBe(200);

        });

        it('should return 404', async () => {
            const newUser = {
                username: 'newTestUser',
                password: 'password123',
                email: 'user@example.com',
                dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const newChannel = {
                name: 'newChannel',
                description: 'description',
                image: '507f1f77bcf86cd799439011',
                idUser: response.body._id,
                idVideo: [],
            };

            const responseChannel = await request(app)
                .post('/channels')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newChannel);

            expect(responseChannel.statusCode).toBe(201);
            expect(responseChannel.body).toHaveProperty('_id');

            const userAddSub = await request(app).patch(`/users/sub/60b9b0b9e0f94bc9b5a5976f`).send({ subId: responseChannel.body._id }).set('Authorization', `Bearer ${testAuthToken}`);

            expect(userAddSub.statusCode).toBe(404);
            expect(userAddSub.body).toHaveProperty('message', 'User not found');
        });

        it('should return 400', async () => {
            const newUser = {
                username: 'newTestUser',
                password: 'password123',
                email: 'user@exemple.com',
                dateOfBirth: '1990-01-01',
            };

            const response = await request(app)
                .post('/users')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newUser);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');

            const userAddSub = await request(app).patch(`/users/sub/${response.body._id}`).send({}).set('Authorization', `Bearer ${testAuthToken}`);
            expect(userAddSub.statusCode).toBe(400);
            expect(userAddSub.body).toHaveProperty('message', 'Sub is required');
        });
    });
});