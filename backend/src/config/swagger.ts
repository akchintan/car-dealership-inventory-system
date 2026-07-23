import swaggerJSDoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Dealership Inventory System API',
      version: '1.0.0'
    }
  },
  apis: []
});

export default swaggerSpec;
