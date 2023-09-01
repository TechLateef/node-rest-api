const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "API documentation using Swagger",
    },
  },
  apis: ["./routers/*.js"], // Path to  API routes or controllers
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: { type: "integer" },
          fullname: { type: "string" },
          email: { type: "string" },
          password: { type: "string" },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;
