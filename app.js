const express = require('express');
const app = express();
const checklistRounter = require('./src/rounter/checklist')
require('./config/database')

// a middleware
app.use(express.json())
app.use('/checklists' , checklistRounter)

app.listen(9000, () => {
  console.log('Servidor iniciado')
})