const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const LessonsUsers = sequelize.define("LessonsUsers", {
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  progress: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "User",
      key: "id",
    },
  },
  lessonId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Lesson",
      key: "id",
    },
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Valeur par défaut
  },
});

module.exports = LessonsUsers;
