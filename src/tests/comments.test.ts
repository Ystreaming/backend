import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Comments API Endpoints', () => {
  let commentId: any;

  beforeAll(async () => {
    const newComment = {
      texte: 'Test comment',
      like: 0,
      dislike: 0,
      idUser: '5f9d7b7b7f8b9b1b3c9b4b4b',
    };

    const response = await request(app)
      .post('/comments')
      .send(newComment);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('_id');
    commentId = response.body._id;
  });

  afterAll(async () => {
    await mongoose.model('Comments').deleteOne({ _id: commentId });
    await mongoose.model('Users').deleteOne({ _id: commentId });
  });

  describe('POST /comments', () => {
    it('should create a new comments', async () => {
      const newComment = {
        texte: 'Test comment',
        idUser: '5f9d7b7b7f8b9b1b3c9b4b4b',
      };

      const response = await request(app)
        .post('/comments')
        .send(newComment);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      await mongoose.model('Comments').deleteOne({ _id: response.body._id });
    });

    it('should not create a new comments with wrong data', async () => {
      const newComment = {
      };

      const response = await request(app)
        .post('/comments')
        .send(newComment);

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /comments', () => {
    it('should get all comments', async () => {
      const response = await request(app).get('/comments');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('comments');
    });

    it('should get all comments with pagination', async () => {
      const response = await request(app).get('/comments?page=1&limit=10');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('comments');
    });
  });

  describe('GET /comments/:id', () => {
    it('should get a comment by id', async () => {
      const response = await request(app).get(`/comments/${commentId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', commentId);
    });

    it('should not get a comment by id with wrong id', async () => {
      const response = await request(app).get('/comments/123');

      expect(response.statusCode).toBe(500);
    });

    it('should return 404 if comment not found', async () => {
      const response = await request(app).get('/comments/5f9d7b7b7f8b9b1b3c9b4b4b');

      expect(response.statusCode).toBe(204);
    });
  });

  describe('PUT /comments/:id', () => {
    it('should update a comment', async () => {
      const updateComment = {
        texte: 'Test comment updated',
      };

      const response = await request(app)
        .put(`/comments/${commentId}`)
        .send(updateComment);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', commentId);
      expect(response.body).toHaveProperty('texte', updateComment.texte);
    });

    it('should not update a comment with wrong id', async () => {
      const updateComment = {
        texte: 'Test comment updated',
      };

      const response = await request(app)
        .put('/comments/123')
        .send(updateComment);

      expect(response.statusCode).toBe(500);
    });

    it('should return 404 if comment not found', async () => {
      const updateComment = {
        texte: 'Test comment updated',
      };

      const response = await request(app)
        .put('/comments/5f9d7b7b7f8b9b1b3c9b4b4b')
        .send(updateComment);

      expect(response.statusCode).toBe(204);
    });
  });
});