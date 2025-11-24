const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const uploadOnCloudinary = require("../config/cloudinary");

const createLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreviewFree, videoUrl } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Lecture title and course ID are required!",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    if (course.creator.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to add lectures to this course",
      });
    }

    const lecture = await Lecture.create({
      lectureTitle,
      isPreviewFree,
      videoUrl,
    });

    course.lectures.push(lecture._id);

    await course.save();
    await course.populate("lectures");

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully!",
      lecture,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create lecture",
      error: error.message,
    });
  }
};

const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lectures fetched successfully!",
      lectures: course.lectures,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to find lecture",
      error: error.message,
    });
  }
};

const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    let lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found!",
      });
    }

    if (req.file) {
      const videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }

    if (lectureTitle !== undefined) {
      lecture.lectureTitle = lectureTitle;
    }

    if (isPreviewFree !== undefined) {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      success: true,
      message: "Lecture updated successfully!",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit lecture",
      error: error.message,
    });
  }
};

const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture not found!",
      });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    await Lecture.findByIdAndDelete(lectureId);

    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete lecture",
      error: error.message,
    });
  }
};

module.exports = {
  createLecture,
  getCourseLecture,
  editLecture,
  removeLecture,
};
