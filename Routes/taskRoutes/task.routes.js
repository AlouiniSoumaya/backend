const express = require ("express");
const task = express.Router();

const {createTask, updateTask, deleteTask} = require ('../../Controllers/taskControllers/task.controllers');

task.post ('/createTask',createTask);
task.put ('/updateTask',updateTask);
task.delete('/delteTask',deleteTask);


module.exports = task