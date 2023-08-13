const mongoose = require("mongoose");
const SubTask = require("./subTaskModel");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  subTasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubTask",
    },
  ],
});

taskSchema.pre("remove", async function (next) {
  await SubTask.deleteMany({ _id: { $in: this.subTasks } });
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
