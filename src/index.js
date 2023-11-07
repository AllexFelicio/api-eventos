const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECT_URL);

const port = 3001;

// Rotas
const eventRoutes = require('./routes/eventRoutes');
const placeRoutes = require('./routes/placeRoutes');
const ticketRoutes = require('./routes/ticketRoutes');


app.use('/api-docs', swaggerUI.serve);
app.get('/api-docs', swaggerUI.setup(swaggerDocument))
app.use('/events', eventRoutes);
app.use('/places', placeRoutes);
app.use('/tickets', ticketRoutes);

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
