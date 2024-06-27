const express = require("express");
const router = express.Router();

const {
  addLabel,
  addAllLabel,
  getShowingLabel,
  getAllLabel,
  getLabelById,
  updateLabel,
  updateStatus,
  deleteLabel,
} = require("../controller/labelController");

//add a Label
router.post("/add", addLabel);

//add all Label
router.post("/all", addAllLabel);

//get only showing Label
router.get("/show", getShowingLabel);

//get all Label
router.get("/", getAllLabel);

//get a label
router.get("/:id", getLabelById);

//update a label
router.put("/:id", updateLabel);

//show/hide a Label
router.put("/status/:id", updateStatus);

//delete a label
router.patch("/:id", deleteLabel);

module.exports = router;
