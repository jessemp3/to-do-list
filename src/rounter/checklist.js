const express = require('express');
const rounter = express.Router();

rounter.get('/' , (req , res) => {
  console.log('Olá')
  res.send()
})

rounter.post('/' , (req , res) => {
  console.log(req.body)
  res.status(200).json(req.body)
})

rounter.get('/:id' , (req , res) => {
  console.log(req.body);
  res.send(`ID: ${req.params.id}`)
})

rounter.put('/:id' , (req, res) => {
  console.log(req.body);
  res.send(`PUT ID: ${req.params.id}`)
})

rounter.delete('/:id' , (req, res) => {
  console.log(req.body);
  res.send(`DELETE ID: ${req.params.id}`)
})



module.exports = rounter