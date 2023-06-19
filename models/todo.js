const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ['not completed', 'completed'],
    default: 'not completed',
  },
});

module.exports = mongoose.model("ToDo", todoSchema);
