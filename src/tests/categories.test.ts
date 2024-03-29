import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

describe('User API Endpoints', () => {
    let categorieId: any;
    let testAuthToken: string;
    let JWT_SECRET: string = "jRPiCoTYgg7URsPRCv-43gHh1M6vtbqKmAZg-aOkvag153mR_25jFeGWdKMbdhUNtFZDg5sjhstU6xCzq4JUcA";

    beforeAll(async () => {
      const testUser = { _id: 'user_test_id', email: 'test@example.com' };
      testAuthToken = jwt.sign(testUser, JWT_SECRET, { expiresIn: '1h' });
        const newCategorie = {
            name: 'Cuisine',
            image: '6565fcf55c7d8a60ff6742cb'
        };

        const response = await request(app)
            .post('/category')
            .set('Authorization', `Bearer ${testAuthToken}`)
            .send(newCategorie);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        categorieId = response.body._id;
    });

    afterAll(async () => {
        await mongoose.model('Category').deleteOne({ _id: categorieId });
    });

    describe('POST /category', () => {
        it('should create a new categories', async () => {
            const newCategorie = {
                name: 'Cuisine',
                image: '6565fcf55c7d8a60ff6742cb'
            };

            const response = await request(app)
                .post('/category')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newCategorie);

            expect(response.statusCode).toBe(201);
            expect(response.body).toHaveProperty('_id');
            await mongoose.model('Category').deleteOne({ _id: response.body._id });
        });

        it('should not create a new categories with wrong data', async () => {
            const newCategorie = {
                name: 'Cuisine',
                image: 8590
            };

            const response = await request(app)
                .post('/category')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send(newCategorie);

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });
    });

    describe('GET /category', () => {
        it('should get all categories', async () => {
            const response = await request(app)
                .get('/category')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('categories');
        });

        it('should get all categories with pagination', async () => {
            const response = await request(app)
                .get('/category?page=1&limit=10')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('categories');
        });
    });

    describe('GET /category/:id', () => {
        it('should get one categories', async () => {
            const response = await request(app)
                .get(`/category/${categorieId}`)
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('_id', categorieId);
        });

        it('should not get one categories with wrong id', async () => {
            const response = await request(app)
                .get('/category/123456789')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });

        it('should return 404 if categories not found', async () => {
            const response = await request(app)
                .get('/category/5f8a5b5a9d1e302d0c6b2f9a')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message', 'Category not found');
        });
    });

    describe('PUT /category/:id', () => {
        it('should update one categories', async () => {
          const response = await request(app)
              .put(`/category/${categorieId}`)
              .set('Authorization', `Bearer ${testAuthToken}`)
              .send({ name: 'Cuisine', image: '6565fcf55c7d8a60ff6742cb'  });

          expect(response.statusCode).toBe(200);

          const updatedCategorie = await request(app)
              .get(`/category/${categorieId}`)
              .set('Authorization', `Bearer ${testAuthToken}`);

          expect(updatedCategorie.body).toHaveProperty('name', 'Cuisine');
        });

        it('should not update one categories with wrong data', async () => {
            const response = await request(app)
                .put(`/category/${categorieId}`)
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send({ name: 'Cuisine', image: 8590 });

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });

        it('should not update one categories with wrong id', async () => {
            const response = await request(app)
                .put('/category/123456789')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send({ name: 'Cuisine', image: '6565fcf55c7d8a60ff6742cb'  });

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });

        it('should return 404 if categories not found', async () => {
            const response = await request(app)
                .put('/category/5f8a5b5a9d1e302d0c6b2f9a')
                .set('Authorization', `Bearer ${testAuthToken}`)
                .send({ name: 'Cuisine', image: '6565fcf55c7d8a60ff6742cb'  });

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message', 'Category not found');
        });
    });

    describe('DELETE /category/:id', () => {
        it('should delete one categories', async () => {
            const response = await request(app)
                .delete(`/category/${categorieId}`)
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('message');
        });

        it('should not delete one categories with wrong id', async () => {
            const response = await request(app)
                .delete('/category/123456789')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(500);
            expect(response.body).toHaveProperty('message', 'Internal Server Error');
        });

        it('should return 404 if categories not found', async () => {
            const response = await request(app)
                .delete('/category/5f8a5b5a9d1e302d0c6b2f9a')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(404);
            expect(response.body).toHaveProperty('message', 'Category not found');
        });

        it('Should return 204 if no categories found', async () => {
            const DeleteResponse = await mongoose.model('Category').deleteMany({});

            const response = await request(app)
                .get('/category')
                .set('Authorization', `Bearer ${testAuthToken}`);

            expect(response.statusCode).toBe(204);
        });
    });
});