const express = require('express');
const lessonsController = require('../controllers/lesson.controller'); 

const lessonsRouter = express.Router();


 lessonsRouter.post('/post', lessonsController.create);

 lessonsRouter.get('/get', lessonsController.getAll);


 lessonsRouter.get('/:id', lessonsController.getById);


 lessonsRouter.put('/:id', lessonsController.update);


 lessonsRouter.delete('/:id', lessonsController.delete);

module.exports =  lessonsRouter;



