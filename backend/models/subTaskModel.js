const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const SubTask = mongoose.model("SubTask", subTaskSchema);

module.exports = SubTask;
