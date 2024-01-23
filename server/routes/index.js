const { Router } = require("express");
const usersRouter = require("./usersRouter");
const tasksRouter = require("./tasksRouter");
const classRoomRouter = require('./classRoomsRouter');
const topicsRouter = require ('./topicsRouter')

const appRouter = Router();
appRouter.use("/users", usersRouter);
appRouter.use("/tasks", tasksRouter);
appRouter.use("/classrooms", classRoomRouter);
appRouter.use("/topics", topicsRouter);

module.exports = appRouter;
