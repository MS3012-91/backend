const express = require('express');
const appRouter = require('./routes');

const app = express();

app.use(express.json());
app.use('/api', appRouter);

module.exports = app;