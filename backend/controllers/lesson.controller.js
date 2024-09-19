const Lesson = require('../models/lesson.model');
const Question = require('../models/question.model')
const Choice = require("../models/choice.model")
module.exports = {
  
  async create(req, res) {
    try {
      const lesson = await Lesson.create(req.body);
      res.status(201).json(lesson);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAll: async (req, res) => {
    try {
      const lessons = await Lesson.findAll({
        include: [
          {
            model: Question, 
            include: [Choice], 
          },
        ],
      });
      res.status(200).json(lessons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const lesson = await Lesson.findByPk(req.params.id);
      if (!lesson) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(200).json(lesson);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const [updated] = await Lesson.update(req.body, {
        where: { id: req.params.id },
      });
      if (!updated) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      const updatedLesson = await Lesson.findByPk(req.params.id);
      res.status(200).json(updatedLesson);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await Lesson.destroy({
        where: { id: req.params.id },
      });
      if (!deleted) {
        return res.status(404).json({ message: 'Lesson not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
