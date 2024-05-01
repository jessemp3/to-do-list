const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/todo-list')
  console.log('Conectado ao MongoDB')
}

// mongoose.connect('mongodb://localhost/todo-list' , {useNewUrlParser: true , useUnifiedTopology: true})
//   .then(() => console.log('Conectado ao MongoDB'))
//   .catch((err) => console.log(err))