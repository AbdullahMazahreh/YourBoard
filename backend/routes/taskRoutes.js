const express = require("express");

const {
  createNewTask,
  deleteOneTask,
  updateOneTask,
  getOneCollectionTasks,
  updateTaskCollection,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/newtask", createNewTask);
router.delete("/deletetask", deleteOneTask);
router.patch("/updatetask", updateOneTask);
router.post("/getcollectiontasks", getOneCollectionTasks);
router.post("/changetaskcollection", updateTaskCollection);

module.exports = router;
