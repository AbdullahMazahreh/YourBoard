const SubTask = require("../models/subTaskModel");
const Task = require("../models/taskModel");
const TasksGroup = require("../models/tasksGroupModel");

exports.createNewTask = async (req, res) => {
  const { name, description, tasksGroupId, subTasksTobePosted } = req.body;

  try {
    const task = await Task.create({
      name,
      description,
    });

    await TasksGroup.updateOne(
      { _id: tasksGroupId },
      { $push: { tasks: task._id } }
    );

    const newsubTasks = await SubTask.insertMany(subTasksTobePosted);
    const newsubTasksIds = newsubTasks.map((ele) => ele._id);

    await Task.updateOne(
      { _id: task._id },
      { $push: { subTasks: { $each: newsubTasksIds } } }
    );

    res.status(201).json({
      status: "success",
      message: "Task Created Successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteOneTask = async (req, res) => {
  const { taskId, tasksGroupId } = req.body;

  try {
    await Task.findByIdAndDelete({ _id: taskId });

    const taskGroup = await TasksGroup.updateOne(
      { _id: tasksGroupId },
      { $pull: { tasks: taskId } }
    );

    res.status(200).json({
      status: "success",
      message: "Task Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Delete Task",
    });
  }
};

exports.updateTaskCollection = async (req, res) => {
  const { previousCollection, newCollection, taskId } = req.body;

  try {
    await TasksGroup.updateOne(
      { _id: previousCollection },
      { $pull: { tasks: taskId } }
    );
    await TasksGroup.updateOne(
      { _id: newCollection },
      { $push: { tasks: taskId } }
    );
    res.status(200).json({
      status: "succes",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
    });
  }
};

exports.updateOneTask = async (req, res) => {
  const { taskId } = req.body;

  try {
    const task = await Task.updateOne({ _id: taskId }, req.body);

    res.status(200).json({
      status: "success",
      message: "Task Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Update Task",
    });
  }
};

exports.getOneCollectionTasks = async (req, res) => {
  const { tasksGroupId } = req.body;

  try {
    const tasks = await TasksGroup.findById(tasksGroupId).populate("tasks");

    res.status(200).json({
      tasks: tasks.tasks,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};
