const express = require("express");

const {
  createNewTaskGroup,
  deleteOneTaskGroup,
  updateOneTaskGroup,
  getBoardTasksGroups,
  getOneCollectionAllStatuses,
} = require("../controllers/tasksGroupController");

const router = express.Router();

router.post("/newcollection", createNewTaskGroup);
router.delete("/deletecollection", deleteOneTaskGroup);
router.patch("/updatecollection", updateOneTaskGroup);
router.post("/getboardcollections", getBoardTasksGroups);

module.exports = router;
