const express = require('express')
const checklistDependentRoute = express.Router()
const Checklist = require('../model/checklist')
const Task = require('../model/task')
const checklist = require('../model/checklist')

checklistDependentRoute.get('/:id/tasks/new', async (req , res) => {
  try {
    let task = Task()
    res.status(200).render('task/new' , {checklistId: req.params.id , task: task})
  } catch (error) {
    res.status(422).render('pages/error' , {error: 'Erro ao carregar o formulário'})
  }
})

checklistDependentRoute.post('/:id/task' , async (req , res ) => {
  let { name } = req.body.task
  let task = new Task( {name , checklist: req.params.id})
  
  try {
    await task.save()
    let checklist = await Checklist.findById(req.params.id)
    checklist.taks.push(task)
    await checklist.save()
  } catch (error) {
    let errors = error.errors;
    res.status(422).render('tasks/new' , {task: {...tasks, errors} , checklistId: req.params.id})
  }
})

module.exports = {checklistDependent: checklistDependentRoute}