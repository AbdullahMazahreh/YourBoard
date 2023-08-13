const express = require("express");

const {
  createNewSubTask,
  deleteSubTask,
  updateOneSubTask,
  getTaskSubTasks,
} = require("../controllers/subTaskController");

const router = express.Router();

router.post("/newsubtask", createNewSubTask);
router.delete("/deletesubtask", deleteSubTask);
router.patch("/updatesubtask", updateOneSubTask);
router.post("/gettasksubtasks", getTaskSubTasks);

module.exports = router;
