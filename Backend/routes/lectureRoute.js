const express = require("express");
const lectureRouter = express.Router();
const userAuth = require("../middlewares/userAuth");
const upload = require("../middlewares/multer");
const {
  createLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
} = require("../controllers/lectureController");

lectureRouter.post("/create/:courseId", userAuth, createLecture);
lectureRouter.get("/:courseId", userAuth, getCourseLecture);
lectureRouter.put(
  "/edit/:lectureId",
  userAuth,
  upload.single("videoUrl"),
  editLecture
);
lectureRouter.delete("/:lectureId", userAuth, removeLecture);

module.exports = lectureRouter;
