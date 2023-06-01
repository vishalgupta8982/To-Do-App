const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
   
});

const ToDoschema = mongoose.model('ToDoApp', UserSchema);
module.exports = ToDoschema;
