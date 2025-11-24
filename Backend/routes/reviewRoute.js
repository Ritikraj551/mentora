const express = require("express");
const userAuth = require("../middlewares/userAuth");
const { createReview, getReviews } = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/create", userAuth, createReview);
reviewRouter.get("/all-reviews", getReviews);

module.exports = reviewRouter;
