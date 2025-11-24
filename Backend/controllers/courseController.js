const Course = require("../models/Course");
const uploadOnCloudinary = require("../config/cloudinary");

const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required!",
      });
    }

    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found!",
      });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully!",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate(
      "lectures reviews"
    );

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No published courses found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Published courses fetched successfully!",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get published courses",
      error: error.message,
    });
  }
};

const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });

    if (courses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No courses found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully!",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get creator courses",
      error: error.message,
    });
  }
};

const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
    } = req.body;

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    if (course.creator.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to edit this course",
      });
    }

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
      thumbnail,
    };

    // Remove undefined fields (keep original values)
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    course = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully!",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to edit course",
      error: error.message,
    });
  }
};

const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Course fetched successfully!",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get course by Id",
      error: error.message,
    });
  }
};

const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found!",
      });
    }

    if (course.creator.toString() !== req.userId) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this course",
      });
    }

    course = await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete course",
      error: error.message,
    });
  }
};

module.exports = {
  createCourse,
  getPublishedCourses,
  getCreatorCourses,
  editCourse,
  getCourseById,
  removeCourse,
};
