const _ = require("lodash");
const CreateError = require("http-errors");
const { User } = require("../db/models");

module.exports.createUser = async (req, res, next) => {
  const { body } = req;
  try {
    const createdUser = await User.create(body);
    if (!createdUser) {
      // next(new Error('Server error'));
      return new CreateError(500, "Server error");
      // return res.status(500).send("User is not created");
    } else {
      const preparedUser = _.omit(createdUser.get(), [
        "passwordHash",
        "createdAt",
        "updatedAt",
      ]);
      return res.status(201).send(preparedUser);
    }
  } catch (err) {
    next(err);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  const { pagination } = req;
  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: {
        exclude: ["passwordHash", "createdAt", "updatedAt"],
      },
      order: ["id"],
      ...pagination,
      //   limit: pagination.limit,
      //   offset: pagination.offset,
    });
    return res.status(200).send(foundUsers);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const foundUser = await User.findByPk(userId, {
      raw: true,
      attributes: {
        exclude: ["passwordHash", "createdAt", "updatedAt"],
      },
    });
    if (!foundUser) {
      // return res.status(404).send("User not found");
         return new CreateError(500, "Server error");
    }
    return res.status(200).send(foundUser);
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  const data = req.body;
  try {
    const [, [updatedUser]] = await User.update(data, {
      where: { id: userId },
      raw: true,
      returning: true,
    });
    if (!updatedUser) {
      // return res.status(404).send("User not found");
         return new CreateError(500, "Server error");
    }
    const preparedUser = _.omit(updatedUser, [
      "passwordHash",
      "createdAt",
      "updatedAt",
    ]);
    return res.status(200).send(preparedUser);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.destroy({
      where: { id: userId },
    });
    if (!deletedUser) {
      // return res.status(404).send("Users not found");
         return new CreateError(500, "Server error");
    } else {
      return res.status(204).send("User deleted");
    }
  } catch (err) {
    next(err);
  }
};
