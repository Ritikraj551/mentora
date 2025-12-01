const express = require("express");
const userAuth = require("../middlewares/userAuth");
const { createReview, getReviews } = require("../controllers/reviewController");
const reviewRouter = express.Router();

reviewRouter.post("/createreview", userAuth, createReview);
reviewRouter.get("/getreviews", getReviews);

module.exports = reviewRouter;
