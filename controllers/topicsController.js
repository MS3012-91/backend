const createHttpError = require("http-errors");
const { Topic, ClassRoom } = require("../db/models");

module.exports.getTopicById = async (req, res, next) => {
    const {taskId}  = req.params;
    console.log("topicId", taskId);
  try {
    const foundTopic = await Topic.findByPk(taskId, {
      raw: true,
      attributes: { exclude: ["createdAt", "classId", "updatedAt"] },
      include: {
        model: ClassRoom,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    if (!foundTopic) {
      return next(createHttpError(404, "Topic not found"));
    }
    res.status(200).send(foundTopic);
  } catch (err) {
    next(err);
  }
};
