const uploadOnCloudinary = require("../config/cloudinary");
const User = require("../models/User");

const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, description } = req.body;

    // Handle photo upload (if new file is sent)
    let photoUrl;
    if (req.file) {
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl;

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Update Profile Error",
      error: error.message,
    });
  }
};

const getCreatorById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Creator fetched successfully", user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch creator",
      error: error.message,
    });
  }
};

module.exports = { getCurrentUser, updateProfile, getCreatorById };
