const createHttpError = require("http-errors");
const { Topic, ClassRoom } = require("../db/models");

module.exports.getClassRoomTopics = async (req, res, next) => {
  const { classRoomId } = req.params;
  console.log("classRoomId", classRoomId);
  try {
    const findClassRoom = await ClassRoom.findByPk(classRoomId);
    if (!findClassRoom) {
      return next(createHttpError(404, "ClassRoom not found"));
    }
    const foundTopics = await findClassRoom.getTopics({
      raw: true,
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
      res.status(200).send(foundTopics);
  } catch (err) {
    next(err);
  }
};
