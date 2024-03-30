const express = require('express');
const app = express();
const checklistRounter = require('./src/rounter/checklist')

// a middleware
app.use(express.json())
app.use('/checklists' , checklistRounter)

app.listen(9000, () => {
  console.log('Servidor iniciado')
})