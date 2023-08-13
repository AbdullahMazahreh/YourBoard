const SubTask = require("../models/subTaskModel");
const Task = require("../models/taskModel");

exports.createNewSubTask = async (req, res) => {
  const { name, description, taskId } = req.body;

  try {
    const subTask = await SubTask.create({
      name,
      description,
    });

    await Task.updateOne({ _id: taskId }, { $push: { subTasks: subTask._id } });

    res.status(201).json({
      status: "success",
      message: "Sub Tasks Created Successfully",
      subTask,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Create New Sub Task",
    });
  }
};

exports.deleteSubTask = async (req, res) => {
  const { subTaskId, taskId } = req.body;

  try {
    await SubTask.findByIdAndDelete({ _id: subTaskId });

    const subTask = await Task.updateOne(
      { _id: taskId },
      { $pull: { subTasks: subTaskId } }
    );

    res.status(200).json({
      status: "success",
      message: "Sub Task Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Delete Sub Task",
    });
  }
};

exports.updateOneSubTask = async (req, res) => {
  const { subTaskId } = req.body;

  try {
    const subTask = await SubTask.updateOne({ _id: subTaskId }, req.body);

    res.status(200).json({
      status: "success",
      message: "Sub Task Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Update Sub Task",
    });
  }
};

exports.getTaskSubTasks = async (req, res) => {
  const { taskId } = req.body;

  try {
    const task = await Task.findById(taskId).populate("subTasks");

    const subTasks = task.subTasks

    res.status(200).json({
      subTasks,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Get Sub Task",  
    });
  }
};
