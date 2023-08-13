const Board = require("../models/boardModel");
const User = require("../models/userModel");
const TasksGroup = require("../models/tasksGroupModel");

exports.createNewBoard = async (req, res) => {
  const { name, color } = req.body;
  const userId = req.user;

  try {
    const newBoard = await Board.create({
      name,
      color,
    });

    await User.updateOne(
      { _id: userId.id },
      { $push: { boards: newBoard._id } }
    );

    const todoCollection = await TasksGroup.create({
      name: "TODO",
      color: "#00FFFF",
    });

    const doingCollection = await TasksGroup.create({
      name: "DOING",
      color: "#806fe3",
    });

    const doneCollection = await TasksGroup.create({
      name: "DONE",
      color: "#13bf36",
    });

    const valuesToAdd = [todoCollection, doingCollection, doneCollection];

    await Board.updateOne(
      { _id: newBoard._id },
      {
        $push: {
          tasksGroups: { $each: valuesToAdd.map((value) => value._id) },
        },
      }
    );

    res.status(201).json({
      status: "success",
      message: "Board Created Successfully",
      newBoard,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteOneBoard = async (req, res) => {
  const { userId, boardId } = req.body;

  try {
    const board = await Board.findOneAndDelete({ _id: boardId });

    const user = await User.updateOne(
      { _id: userId },
      { $pull: { boards: boardId } }
    );

    res.status(200).json({
      status: "success",
      message: "Board Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateOneBoard = async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.updateOne({ _id: boardId }, req.body);
    res.status(200).json({
      status: "success",
      message: "Board Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Update Bored",
    });
  }
};

exports.getUserBoards = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("boards");

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found.",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        boards: user.boards,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching user boards.",
    });
  }
};

exports.getallstatuses = async (req, res) => {
  const { boardId } = req.body;

  try {
    const board = await Board.findById(boardId).populate("tasksGroups");

    const taskGroupsIds = board.tasksGroups;

    const taskGroupsToBeSend = taskGroupsIds.map((ele) => ({
      name: ele.name,
      id: ele._id,
    }));

    res.status(200).json({
      taskGroupsToBeSend,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Error fetching statuses.",
    });
  }
};
