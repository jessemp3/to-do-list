const express = require('express');
const path = require('path')
const checklistRounter = require('./src/rounter/checklist')
const rootRounter = require('./src/rounter/index')
require('./config/database')

const app = express();
app.use(express.json())

app.use(express.static(path.join(__dirname , 'public')))


app.set('views' , path.join(__dirname, 'src/views'))
app.set('view engine' , 'ejs')
// a middleware
app.use('/' , rootRounter)
app.use('/checklists' , checklistRounter)

app.listen(9000, () => {
  console.log('Servidor iniciado')
})