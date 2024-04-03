const express = require("express");
const rounter = express.Router();

const Checklist = require("../model/checklist");

rounter.get("/", async (req, res) => {
  try {
    let checklist = await Checklist.find({});
    res.status(200).json(checklist);
  } catch (error) {
    res.status(500).json(error);
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
    let checklist = await Checklist.findById(req.params.id);
    res.status(200).json(checklist);
  } catch (error) {
    res.status(422).json(error);
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
