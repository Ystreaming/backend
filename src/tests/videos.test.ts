import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';
import path from 'path';

describe('Videos API Endpoints', () => {
  let videoId: any;
  let userId: any;
  let channelId: any;
  let categoryId: any;
  let commentId: any;

  beforeAll(async () => {
    const newUser = {
      username: 'testUser',
      password: 'password123',
      email: 'test@exemple.com',
      dateOfBirth: '1990-01-01',
    };

    const userRes = await request(app)
      .post('/users')
      .send(newUser);

    expect(userRes.statusCode).toEqual(201);
    userId = userRes.body._id;

    const newCategory = {
      name: 'testCategory',
      image: '6565fcf55c7d8a60ff6742cb',
    };

    const categoryRes = await request(app)
      .post('/category')
      .send(newCategory);

    expect(categoryRes.statusCode).toEqual(201);
    categoryId = categoryRes.body._id;

    const newChannel = {
      name: 'testChannel',
      description: 'testDescription',
      idCategory: categoryId,
      idUser: userId,
      image: '6565fcf55c7d8a60ff6742cb',
      idVideo: '6565fcf55c7d8a60ff6742cb',
    };

    const channelRes = await request(app)
      .post('/channels')
      .send(newChannel);

    expect(channelRes.statusCode).toEqual(201);
    channelId = channelRes.body._id;

    const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');

    const res = await request(app)
      .post('/videos')
      .attach('img', filePath)
      .field('title', 'testVideo')
      .field('view', 0)
      .field('like', 0)
      .field('dislike', 0)
      .field('description', 'testDescription')
      .field('language', 'testLanguage')
      .field('time', 1000)
      .field('url', 'http://testUrl.com/')
      .field('urllocal', 'http://testUrlLocal.com/')
      .field('idChannel', channelId)
      .field('idCategory', categoryId);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    videoId = res.body._id;

    const newComment = {
      texte: 'testComment',
      idUser: userId,
      idVideo: videoId,
    };

    const commentRes1 = await request(app)
      .post('/comments')
      .send(newComment);

    expect(commentRes1.statusCode).toEqual(201);
    commentId = commentRes1.body._id;

    const commentRes = await request(app)
      .patch(`/videos/${videoId}`)
      .field('idComment', commentId);

    expect(commentRes.statusCode).toEqual(200);
  });

  afterAll(async () => {
    await mongoose.model('Videos').deleteOne({ _id: videoId });
    await mongoose.model('Channels').deleteOne({ _id: channelId });
    await mongoose.model('Category').deleteOne({ _id: categoryId });
    await mongoose.model('Users').deleteOne({ _id: userId });
  });

  describe('GET /videos', () => {
    it('should get all videos', async () => {
      const res = await request(app).get('/videos');

      expect(res.statusCode).toEqual(200);
      expect(res.body.videos[0]).toHaveProperty('_id');
    });
  });

  describe('GET /videos/recommendation', () => {
    it('should get all videos', async () => {
      const res = await request(app).get('/videos/recommendation');

      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('_id');
    });
  });

  describe('GET /videos/mostviewed', () => {
    it('should get all videos', async () => {
      const res = await request(app).get('/videos/mostviewed');

      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('_id');
    });
  });

  describe('GET /videos/search/:search', () => {
    it('should get all videos', async () => {
      const res = await request(app).get('/videos/search/test');

      expect(res.statusCode).toEqual(200);
      expect(res.body.videos[0]).toHaveProperty('_id');
    });

    it('should return 200 if no videos found', async () => {
      const res = await request(app).get('/videos/search/123');

      expect(res.statusCode).toEqual(200);
    });

    it('should return 500 if error', async () => {
      const res = await request(app).get('/videos/search/');

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /videos/category/:id', () => {
    it('should get all videos by category', async () => {
      const res = await request(app).get(`/videos/category/${categoryId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.videos[0]).toHaveProperty('_id');
    });

    it('should return 500 if bad id', async () => {
      const res = await request(app).get(`/videos/category/123`);

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /videos/comments/:id', () => {
    it('should get all comments by video', async () => {
      const res = await request(app).get(`/videos/comments/${videoId}`);

      console.log(res.body);
      expect(res.statusCode).toEqual(200);
      expect(res.body.comments[0]).toHaveProperty('_id');
    });

    it('should return 500 if bad id', async () => {
      const res = await request(app).get(`/videos/comments/123`);

      expect(res.statusCode).toEqual(500);
    });

    it('should return 204 if no comments found', async () => {
      //create video without comments
      const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');

      const resVideo = await request(app)
        .post('/videos')
        .attach('img', filePath)
        .field('title', 'testVideo')
        .field('view', 0)
        .field('like', 0)
        .field('dislike', 0)
        .field('description', 'testDescription')
        .field('language', 'testLanguage')
        .field('time', 1000)
        .field('url', 'http://testUrl.com/')
        .field('urllocal', 'http://testUrlLocal.com/')
        .field('idChannel', channelId)
        .field('idCategory', categoryId);

      const res = await request(app).get(`/videos/comments/${resVideo.body._id}`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('GET /videos/:id', () => {
    it('should get a video', async () => {
      const res = await request(app).get(`/videos/${videoId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should not get one channel with wrong id', async () => {
      const res = await request(app).get(`/videos/123`);

      expect(res.statusCode).toEqual(500);
    });

    it('should return 204 if video not found', async () => {
      const res = await request(app).get(`/videos/6565fcf55c7d8a60ff6742cb`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('GET /videos/view/channel/:id', () => {
    it('should get all views by channel', async () => {
      const res = await request(app).get(`/videos/view/channel/${channelId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('view');
    });

    it('should return 500 if bad id', async () => {
      const res = await request(app).get(`/videos/view/channel/123`);

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('GET /videos/like/channel/:id', () => {
    it('should get all likes by channel', async () => {
      const res = await request(app).get(`/videos/like/channel/${channelId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body[0]).toHaveProperty('like');
    });

    it('should return 500 if bad id', async () => {
      const res = await request(app).get(`/videos/like/channel/123`);

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('PUT /videos/:id', () => {
    it('should update a video', async () => {
      const res = await request(app)
        .put(`/videos/${videoId}`)
        .send({ title: 'testVideoUpdate' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should not update a video with wrong id', async () => {
      const res = await request(app)
        .put(`/videos/123`)
        .send({ title: 'testVideoUpdate' });

      expect(res.statusCode).toEqual(500);
    });

    it('should return 404 if video not found', async () => {
      const res = await request(app)
        .put(`/videos/6565fcf55c7d8a60ff6742cb`)
        .send({ title: 'testVideoUpdate' });

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PATCH /videos/:id', () => {
    it('should add a comment on a video', async () => {
      const res = await request(app)
        .patch(`/videos/${videoId}`)
        .send({ idComment: commentId });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should not add a comment on a video with wrong id', async () => {
      const res = await request(app)
        .patch(`/videos/123`)
        .send({ idComment: commentId });

      expect(res.statusCode).toEqual(500);
    });

    it('should return 500 if video not found', async () => {
      const res = await request(app)
        .patch(`/videos/6565fcf55c7d8a60ff6742cb`)
        .send({ idComment: commentId });

      expect(res.statusCode).toEqual(500);
    });
  });

  describe('DELETE /videos/:id', () => {
    it('should delete a video', async () => {
      const res = await request(app).delete(`/videos/${videoId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id');
    });

    it('should return 500', async () => {
      const res = await request(app).delete(`/videos/123`);

      expect(res.statusCode).toEqual(500);
    });

    it('should return 204', async () => {
      const res = await request(app).delete(`/videos/6565fcf55c7d8a60ff6742cb`);

      expect(res.statusCode).toEqual(204);
    });
  });

  describe('POST /videos', () => {
    it('should create a video', async () => {
      const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');

      const res = await request(app)
        .post('/videos')
        .attach('img', filePath)
        .field('title', 'testVideo')
        .field('view', 0)
        .field('like', 0)
        .field('dislike', 0)
        .field('description', 'testDescription')
        .field('language', 'testLanguage')
        .field('time', 1000)
        .field('url', 'http://testUrl.com/')
        .field('urllocal', 'http://testUrlLocal.com/')
        .field('idChannel', channelId)
        .field('idCategory', categoryId);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
    });

    it('should return 400', async () => {
      const res = await request(app).post('/videos');

      expect(res.statusCode).toEqual(400);
    });

    it('should return 500', async () => {
      const filePath = path.resolve('./src/tests/ressources/fichier_tests_create_user.jpg');

      const res = await request(app)
        .post('/videos')
        .attach('img', filePath)
        .field('title', 'testVideo')
        .field('view', 0)
        .field('like', 0)
        .field('dislike', 0)
        .field('description', 'testDescription')
        .field('language', 'testLanguage')
        .field('time', 1000)
        .field('url', 'http://testUrl.com/')
        .field('urllocal', 'http://testUrlLocal.com/')
        .field('idChannel', channelId)
        .field('idCategory', '123');

      expect(res.statusCode).toEqual(500);
    });
  });
});