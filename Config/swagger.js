const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:4424",
      },
    ],
  },
  apis: ["./Routes/*.js", "./index.js"], // Path relative to project root where node runs
};

export default swaggerOptions;
