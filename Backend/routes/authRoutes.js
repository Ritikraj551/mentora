const express = require("express");
const {
  signUp,
  logIn,
  logOut,
  sendOTP,
  verifyOtp,
  resetPassword,
  googleAuth,
} = require("../controllers/authContoller");

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.get("/logout", logOut);
authRouter.post("/sendotp", sendOTP);
authRouter.post("/verifyotp", verifyOtp);
authRouter.post("/resetpassword", resetPassword);
authRouter.post("/googleauth", googleAuth);

module.exports = authRouter;
