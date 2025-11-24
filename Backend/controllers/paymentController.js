const crypto = require("crypto");
const razorpayInstance = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");

const createOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: courseId.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error creating Razorpay order",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    const courseId = orderInfo.receipt;
    const userId = req.userId;

    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
      await course.save();
    }

    return res.status(200).json({ message: "Payment verified & enrolled" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Payment verification failed", error: error.message });
  }
};
module.exports = { createOrder, verifyPayment };
