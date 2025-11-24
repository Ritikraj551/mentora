const Course = require("../models/Course");
const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { rating, comments, courseId } = req.body;
    const userId = req.userId;

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }

    const course = await Course.findById(courseId).select("_id reviews");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const alreadyReviewed = await Review.findOne({
      course: courseId,
      user: userId,
    }).lean();

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this course" });
    }

    const review = await Review.create({
      course: courseId,
      user: userId,
      rating,
      comments,
    });

    // Push review in Course model
    await Course.findByIdAndUpdate(courseId, {
      $push: { reviews: review._id },
    });

    // Average rating
    const allReviews = await Review.find({ course: courseId }).select("rating");
    const avgRating =
      allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await Review.findByIdAndUpdate(courseId, {
      averageRating: avgRating.toFixed(1),
    });

    return res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create review",
      error: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "name photoUrl description")
      .populate("course", "thumbnail")
      .sort({ reviewedAt: -1 })
      .lean();

    return res.status(200).json({
      message: "Reviews fetched successfully",
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

module.exports = { createReview, getReviews };
