const express = require('express')

const checklistDependentRouter = express.Router()

const Checklist = require('../model/checklist')
const Task = require('../model/task')


checklistDependentRouter.get('/:id/tasks/new' , async (req , res) => {
  try {
    let task = Task()
    res.status(200).render('tasks/new' , {checklistId : req.params.id , task: task})
  } catch (error) {
    res.status(422).render('pages/error' , {errors : 'Erro ao carregar o formulário'})
  }
})

checklistDependentRouter.post('/:id/tasks' , async (req, res ) => {
  let { name } = req.body.task
  let task = new Task({name , checklist: req.params.id})

  try {
    await task.save();
    let checklist = await Checklist.findById(req.params.id)
    checklist.tasks.push(task)
    await checklist.save()
  } catch (error) {
    let errors = error.errors
    res.status(422).render('tasks/new' , {task: {...task, errors} , checklistId: req.params.id})
  }
})

module.exports = {checklistDependent: checklistDependentRouter}