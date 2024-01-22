const { Router } = require("express");
const { classRoomsController } = require("../controllers");

const classRoomRouter = Router();

// classRoomRouter
//   .route("/")
//   .get(classRoomController.getClassRooms)
//   .post(classRoomController.createClassRoom);

classRoomRouter
  .route("/:classRoomId/topics")
  .get(classRoomsController.getClassRoomTopics);
//   .patch(classRoomController.updateClassRoomById)
//   .delete(classRoomController.deleteClassRoomById);

module.exports = classRoomRouter;
