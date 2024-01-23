const { Router } = require('express');
const { tasksController } = require('../controllers');

const tasksRouter = Router();

tasksRouter.route('/')
    .get(tasksController.getTasks)
    .post(tasksController.createTask);

tasksRouter
  .route("/:taskId")
  .get(tasksController.getTaskById)
  .patch(tasksController.updateTaskById)
  .delete(tasksController.deleteTaskById);

module.exports = tasksRouter;