const { Router } = require('express');
const usersRouter = require ('./usersRouter')

const appRouter = Router();
appRouter.use('/users', usersRouter);

module.exports = appRouter;