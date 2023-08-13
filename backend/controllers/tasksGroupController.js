const Board = require("../models/boardModel");
const TasksGroup = require("../models/tasksGroupModel");

exports.createNewTaskGroup = async (req, res) => {
  const { name, color, boardId } = req.body;

  try {
    const newTasksGroup = await TasksGroup.create({ name, color });

    await Board.updateOne(
      { _id: boardId },
      { $push: { tasksGroups: newTasksGroup._id } }
    );

    res.status(201).json({
      status: "success",
      message: "Collection Created Successfully",
      newTasksGroup,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Create New Collection",
    });
  }
};

exports.deleteOneTaskGroup = async (req, res) => {
  const { boardId, tasksGroupId } = req.body;

  try {
    await TasksGroup.findByIdAndDelete({ _id: tasksGroupId });

    const board = await Board.updateOne(
      { _id: boardId },
      { $pull: { tasksGroups: tasksGroupId } }
    );

    res.status(200).json({
      status: "success",
      message: "Collection Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Delete Collection",
    });
  }
};

exports.updateOneTaskGroup = async (req, res) => {
  const { tasksGroupId } = req.body;

  try {
    const tasksGroup = await TasksGroup.updateOne(
      { _id: tasksGroupId },
      req.body
    );
    res.status(200).json({
      status: "success",
      message: "Collection Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Update Collection",
    });
  }
};

exports.getBoardTasksGroups = async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findById(boardId).populate("tasksGroups");

    res.status(200).json({
      status: "succes",
      collections: board.tasksGroups,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      err,
    });
  }
};

