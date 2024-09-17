const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Lesson = sequelize.define('Lesson', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM,
    values: ['multiple', 'order'], 
    allowNull: false
  },
  languageId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Languages', 
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = Lesson;