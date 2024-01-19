import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'YStream API',
    description: 'Ystream API Backend'
  },
  servers: [
    {
      url: 'http://localhost:3000',   // by default: ''
      description: 'Local server'  // by default: 'local server'
    },
    {
      url: 'https://ystream-api.herokuapp.com',   // by default: ''
      description: 'Heroku server'  // by default: 'local server'
    }
  ],
  tags: [
    {
      name: 'Videos',
      description: 'Videos Endpoints'
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  },
  definitions: {
    Category: {
      $name: 'Cuisine',
      $image: '65a8f77318788511f9effda8',
    },
    Videos: {
      $title: 'Je suis mon titre',
      createdAt: '2021-06-10T13:22:41.000Z',
      $view: 0,
      $like: 0,
      $dislike: 0,
      $description: 'Je suis ma description',
      $language: 'fr',
      $time: 0,
      $img: '65a8f77318788511f9effda8',
      $url: 'Je suis mon url',
      $urllocal: 'Je suis mon urllocal',
      idComment: ['65a8f77318788511f9effda8', '65a8f77318788511f9effda8'],
      $idChannel: '65a8f77318788511f9effda8',
      $idCategory: '65a8f77318788511f9effda8',
    },
    Users: {
      $firstName: 'John',
      $lastName: 'Doe',
      $email: 'user@example.com',
      $dateOfBirth: '1999-12-31',
      $username: 'johndoe',
      $password: 'password',
      createdAt: '2021-06-10T13:22:41.000Z',
      status: true,
      sub: ['65a8f77318788511f9effda8', '65a8f77318788511f9effda8'],
      $language: 'fr',
      $profileImage: '65a8f77318788511f9effda8',
    },
    Channel: {
      $name: 'Cuisine',
      $description: '65a8f77318788511f9effda8',
      $image: '65a8f77318788511f9effda8',
      subNumber: 0,
      $idCategory: '65a8f77318788511f9effda8',
      idVideos: ['65a8f77318788511f9effda8'],
      $idUser: '65a8f77318788511f9effda8',
    },
    Roles: {
      $name: 'Administrateur',
      $permission: ['DELETE', 'UPDATE', 'CREATE', 'READ'],
      $idUsers: ['65a8f77318788511f9effda8'],
    },
    Comments: {
      $texte: 'Je suis mon texte',
      like: 0,
      dislike: 0,
      createdAt: '2021-06-10T13:22:41.000Z',
      $idVideo: '65a8f77318788511f9effda8',
      $idUser: '65a8f77318788511f9effda8',
    },
    Historics: {
      $idUser: '65a8f77318788511f9effda8',
      $idVideo: '65a8f77318788511f9effda8',
    },
    Notifications: {
      $title: 'Je suis mon titre',
      $description: 'Je suis ma description',
      $url: 'Je suis mon url',
      $type: 'Je suis mon type',
      $idUser: '65a8f77318788511f9effda8',
    }
  }
};

const outputFile = '../documentation/swagger_output.json';
const routes = ['./src/app.ts'];

swaggerAutogen({openapi: '3.0.3'})(outputFile, routes, doc);