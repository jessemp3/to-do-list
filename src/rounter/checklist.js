const express = require("express");
const rounter = express.Router();

const Checklist = require("../model/checklist");

rounter.get("/", async (req, res) => {
  try {
    let checklists = await Checklist.find({});
    res.status(200).render('checklists/index',  { checklist: checklists})
  } catch (error) {
    res.status(404).render('pages/error' , {error: 'Erro ao exibir as listas'})
  }
});

rounter.get('/new' , async (req , res) => {
  try {
    let checklist = new Checklist()
    res.status(200).render('checklists/new' , {checklist: checklist})
  } catch (error) {
    res.status(500).render('pages/error' , {error: 'Erro ao carregar o formulario !'})
  }
})

rounter.get('/:id/edit', async(req, res) =>{
  try {
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/edit', { checklist: checklist })
  } catch (error) {
    res.status(500).render('pages/error', {error: 'Erro ao exibir a edição Listas de tarefas'});
  }
})

rounter.post("/", async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = new Checklist({name})

  try {
    await checklist.save();
    res.redirect('/checklists')
  } catch (error) {
    res.status(422).render('checklists/new' , {checklist: {...checklist , errors}})
  }
});

rounter.get("/:id", async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks');
    res.status(200).render('checklists/show',  { checklist: checklist})
  } catch (error) {
    res.status(404).render('pages/error' , {errors: 'Erro ao exibir as listas de tarefas'})
  }
});

rounter.put('/:id', async (req, res) => {
  let { name } = req.body.checklist;
  let checklist = await Checklist.findById(req.params.id)

  try {
    await checklist.updateOne({name})
    res.redirect('/checklists');
  } catch (error) {
    let errors = error.errors;
    res.status(422).render('checklists/edit', {checklist: {...checklist, errors}});
  }
})


rounter.delete("/:id", async (req, res) => {
    try {
      let checklist = await Checklist.findByIdAndDelete(req.params.id)
      res.redirect('/checklists')
    } catch (error) {
      res.status(500).render('pages/error' , {error: 'Erro ao deletar a listas de tarefas'})
    }
});

module.exports = rounter;
