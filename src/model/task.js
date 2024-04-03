const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: {type: String , require: true},
  done: {type: Boolean , default: false},
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    require: true
  }
})

module.export = mongoose.model('Task' , taskSchema)