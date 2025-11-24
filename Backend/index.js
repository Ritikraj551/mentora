const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const userRouter = require("./routes/userRoute");
const courseRouter = require("./routes/courseRoute");
const lectureRouter = require("./routes/lectureRoute");
const paymentRouter = require("./routes/paymentRoute");
const reviewRouter = require("./routes/reviewRoute");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/lecture", lectureRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello from the server.");
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () =>
      console.log(`✅ Server running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
};

startServer();
