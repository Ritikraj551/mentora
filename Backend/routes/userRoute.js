const express = require("express");
const userAuth = require("../middlewares/userAuth");
const {
  getCurrentUser,
  updateProfile,
  getCreatorById,
} = require("../controllers/userController");
const upload = require("../middlewares/multer");

const userRouter = express.Router();

userRouter.get("/currentuser", userAuth, getCurrentUser);
userRouter.post("/profile", userAuth, upload.single("photoUrl"), updateProfile);
userRouter.get("/creator/:userId", userAuth, getCreatorById);

module.exports = userRouter;
