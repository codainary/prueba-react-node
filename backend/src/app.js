const express = require('express');
const empleadoRoutes = require('./infra/routes/empleadoRoutes')

const app = express();

app.use(express.json());
app.use('/api', empleadoRoutes);

module.exports = app;
