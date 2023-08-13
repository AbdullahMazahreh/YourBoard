const mongoose = require("mongoose");
const TasksGroup = require("./tasksGroupModel");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tasksGroups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TasksGroup",
    },
  ],
});

boardSchema.pre("findOneAndDelete", async function (next) {
  await TasksGroup.deleteMany({ _id: { $in: this.tasksGroups } });
  next();
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
