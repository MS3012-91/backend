const { Router } = require("express");
const usersRouter = require("./usersRouter");
const tasksRouter = require("./tasksRouter");

const appRouter = Router();
appRouter.use("/users", usersRouter);
appRouter.use("/tasks", tasksRouter);

module.exports = appRouter;
