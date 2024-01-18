import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',            // by default: '1.0.0'
    title: 'YStream API',              // by default: 'REST API'
    description: 'Ystream API Backend'         // by default: ''
  },
  servers: [
    {
      url: '',              // by default: 'http://localhost:3000'
      description: ''       // by default: ''
    },
  ],
  tags: [                   // by default: empty Array
    {
      name: 'Users',             // Tag name
      description: ''       // Tag description
    },
    {
      name: 'Videos',             // Tag name
      description: ''       // Tag description
    },
  ],
  components: {}            // by default: empty object
};

const outputFile = './swagger_output.json';
const routes = ['./src/app.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);