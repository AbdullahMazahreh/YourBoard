const User = require("../models/userModel");
const TasksGroup = require("../models/tasksGroupModel");
const Board = require("../models/boardModel");
const signToken = require("../utils/signToken");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");

exports.signUpNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });

    const newBoard = await Board.create({
      name: "Your Board",
    });

    await User.updateOne(
      { _id: newUser._id },
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

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      message: "User created Successfully",
      token,
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Failed To Create New User",
      err,
    });
  }
};

exports.signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid email or password",
      });
    }

    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Incorrect email or password",
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = await req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in.",
      });
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Invalid token or expired. Please log in again.",
    });
  }
};
