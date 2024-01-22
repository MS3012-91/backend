const { Router } = require("express");
const { topicsController } = require("../controllers");

const topicsRouter = Router();

topicsRouter
  .route("/")
//   .get(topicsController.getTopics)
//   .post(topicsController.createTopic);

topicsRouter
  .route("/:taskId")
  .get(topicsController.getTopicById)
//   .patch(topicsController.updateTopicById)
//   .delete(topicsController.deleteTopicById);

module.exports = topicsRouter;
