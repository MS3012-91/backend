const _ = require("lodash");
const { Task } = require("../db/models");

module.exports.createTask = async (req, res, next) => {
  const data = req.body;
  try {
    const createdTask = await Task.create(data);
    if (!createdTask) {
      return res.status(505).send("Server error");
    }
    const preparedTask = _.omit(createdTask.get(), ["updatedAt"]);
    return res.status(201).send(preparedTask);
  } catch (err) {
    next(err);
  }
};

module.exports.getTasks = async (req, res) => {
  try {
    const findTasks = await Task.findAll({
      raw: true,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!findTasks) {
      return res.status(400).send("Tasks not found");
    }
    return res.status(200).send(findTasks);
  } catch (err) {
    return res.status(505).send("Server error");
  }
};

module.exports.getTaskById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const foundTask = await Task.findByPk(taskId, {
      raw: true,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!foundTask) {
      return res.send(404).send("Task not found");
    }
    res.status(200).send(foundTask);
  } catch (err) {
    return res.status(505).send("Server error");
  }
};

module.exports.updateTaskById = async (req, res) => {
  const { taskId } = req.params;
  const data = req.body;
  try {
    const [, [updatedTask]] = await Task.update(data, {
      where: {
        id: taskId,
      },
      raw: true,
      returning: true,
    });
    if (!updatedTask) {
      return res.status(401).send("User not updated");
    }
    const preparedTask = _.omit(updatedTask, ["createdAt", "updatedAt"]);
    res.status(200).send(preparedTask);
  } catch (err) {
    return res.status(505).send("Server error");
  }
};

module.exports.deleteTaskById = async (req, res, next) => {
  const { taskId } = req.params;
  try {
    const deletedTask = await Task.destroy({ where: { id: taskId } });
    if (!deletedTask) {
      res.status(404).send("Task not found");
    }
    res.status(200).send("Task deleted");
  } catch (err) {
    next(err);
  }
};
