"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ClassRoom extends Model {
    static associate(models) {
      ClassRoom.hasMany(models.Topic, {
        foreignKey: {
          name: "classId",
          allowNull: false,
        },
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      });
    }
  }
  ClassRoom.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ClassRoom",
      underscored: true,
    }
  );
  return ClassRoom;
};
