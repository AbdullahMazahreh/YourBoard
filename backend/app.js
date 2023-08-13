const express = require("express");
const cors = require("cors");
const app = express();

const authRouter = require("./routes/authRoutes");
const boardRouter = require("./routes/boardRoutes");
const tasksGroupRouter = require("./routes/taskGroupRoutes");
const taskRouter = require("./routes/taskRoutes");
const subTaskRouter = require("./routes/subTaskRoutes");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/tasksgroup", tasksGroupRouter);
app.use("/api/v1/task", taskRouter);
app.use("/api/v1/subtask", subTaskRouter);

module.exports = app;
