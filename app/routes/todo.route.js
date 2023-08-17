const express = require('express');
const todoController = require('../controllers/todo.controller');
const {todoValidation} = require('../validations');
const validate = require("../middlewares/validate");

const router = express.Router();

router.get('/',todoController.getTodayList);

router.post('/add',validate(todoValidation.addNewItem), todoController.addNewItem);

router.post('/delete', validate(todoValidation.deleteItem), todoController.deleteItem);

 router.get('/customList/:customListname',validate(todoValidation.getCustomList), todoController.getCustomList);

module.exports = router;
