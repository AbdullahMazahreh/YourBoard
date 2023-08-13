const express = require("express");

const {
  createNewBoard,
  deleteOneBoard,
  updateOneBoard,
  getUserBoards,
  getallstatuses,
} = require("../controllers/boardController");

const { protect } = require("../controllers/authController");

const router = express.Router();

router.post("/newboard", protect, createNewBoard);
router.delete("/deleteboard", deleteOneBoard);
router.patch("/updateboard", updateOneBoard);
router.get("/getuserboards", protect, getUserBoards);
router.post("/getallstatuses", getallstatuses);

module.exports = router;
