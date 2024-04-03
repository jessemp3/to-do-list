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

rounter.post("/", async (req, res) => {
  let { name } = req.body;

  try {
    let checklists = await Checklist.create({ name });
    res.status(200).json(checklists);
  } catch (error) {
    res.status(422).json(error);
  }
});

rounter.get("/:id", async (req, res) => {
  try {
    let checklists = await Checklist.findById(req.params.id);
    res.status(200).render('checklists/show',  { checklist: checklists})
  } catch (error) {
    res.status(404).render('pages/error' , {error: 'Erro ao exibir as listas de tarefas'})
  }
});

rounter.put("/:id", async (req, res) => {
  let { name } = req.body
    try {
      let checklist = await Checklist.findByIdAndUpdate(req.params.id , {name} , {new: true})
      res.status(200).json(checklist)
    } catch (error) {
      res.status(422).json(error)
    }
});

rounter.delete("/:id", async (req, res) => {
    try {
      let checklist = await Checklist.findByIdAndDelete(req.params.id)
      res.status(200).json(checklist)
    } catch (error) {
      res.status(422).json(error)
    }
});

module.exports = rounter;
