const { Router } = require("express");
const { usersController } = require("../controllers");
const {paginate} = require("../middleware");

const usersRouter = Router();

usersRouter
  .route("/")
  .get(paginate.paginateUser, usersController.getAllUsers)
  .post(usersController.createUser);

usersRouter
  .route("/:userId")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
