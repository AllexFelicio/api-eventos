const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
require('dotenv').config();

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECT_URL);

const port = 3001;

// Rotas
const eventRoutes = require('./routes/eventRoutes');
const placeRoutes = require('./routes/placeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3001",
          description: "API local",
        },
        {
            url: "https://api-eventos-allexfelicio.vercel.app",
            description: "API de produção",
          },
      ],
    },
    // This is to call all the file
    apis: ["src/**/*.js"],
  };
  
  const specs = swaggerJsDoc(options);
  // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  
  app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
  );
  


//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/events', eventRoutes);
app.use('/places', placeRoutes);
app.use('/tickets', ticketRoutes);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
