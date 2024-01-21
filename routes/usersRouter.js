const { Router } = require("express");
const { usersController } = require("../controllers");
const {paginate, validation} = require("../middleware");

const usersRouter = Router();

usersRouter
  .route("/")
  .get(paginate.paginateUser, usersController.getAllUsers)
  .post(validation.userValidation, usersController.createUser);

usersRouter
  .route("/:userId")
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .delete(usersController.deleteUserById);

module.exports = usersRouter;
