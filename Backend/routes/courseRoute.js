const express = require("express");
const {
  createCourse,
  getPublishedCourses,
  getCreatorCourses,
  editCourse,
  getCourseById,
  removeCourse,
} = require("../controllers/courseController");
const userAuth = require("../middlewares/userAuth");
const upload = require("../middlewares/multer");
const { searchWithAI } = require("../controllers/searchController");

const courseRouter = express.Router();

courseRouter.post("/search", searchWithAI);
courseRouter.post("/create", userAuth, createCourse);
courseRouter.get("/published", getPublishedCourses);
courseRouter.get("/creator", userAuth, getCreatorCourses);
courseRouter.put(
  "/edit/:courseId",
  userAuth,
  upload.single("thumbnail"),
  editCourse
);
courseRouter.get("/:courseId", userAuth, getCourseById);
courseRouter.delete("/:courseId", userAuth, removeCourse);

module.exports = courseRouter;
