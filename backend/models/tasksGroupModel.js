const mongoose = require("mongoose");
const Task = require("./taskModel");

const tasksGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

tasksGroupSchema.pre("remove", async function (next) {
  await Task.deleteMany({ _id: { $in: this.tasks } });
  next();
});

const TasksGroup = mongoose.model("TasksGroup", tasksGroupSchema);

module.exports = TasksGroup;
