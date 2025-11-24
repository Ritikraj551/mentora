Mentora is a full-featured Learning Management System built using the MERN Stack, designed for creators, learners, and educators.
It includes secure authentication, course creation, lecture uploads, AI-powered search, real payments, reviews, and more.

🔗 Live Demo
(Add link if available)

📂 GitHub Repository
https://github.com/Rajat996-alt/Mentora-Backend


🛠️ Tech Stack:-
Backend:
Node.js
Express.js
MongoDB (Mongoose)
JWT + Cookies
Multer + Cloudinary
Razorpay SDK
Google Gemini API
CORS, bcrypt, dotenv

Tools:
Postman
Git & GitHub
Nodemon
NPM


🔐 Authentication:-
Signup & Login with validation
JWT-based authentication
HTTP-only cookies for secure storage
Logout functionality
Protected routes with middleware

👤 User Module:-
Get current user (protected)
Update user profile (name, description, image)
Profile image upload via Multer + Cloudinary
Fetch creator by ID

🎓 Course Module:-
Create course (title, category, creator)
Get all published courses
Get creator-specific courses
Edit course (update thumbnail, details)
Get course by ID
Delete course

🎥 Lecture Module:-
Create lecture (title, preview, video)
Upload lecture video via Cloudinary
Get all lectures of a course
Edit lecture (title, preview, video)
Remove lecture

💳 Payment Integration:-
Razorpay Payments Integration
Order Initialization & Receipt Generation
Secure Payment Verification
Full Course Purchase Flow

⭐ Reviews & Ratings Module:-
Students can add course reviews (rating + comment)
Only enrolled users can submit a review
Prevent duplicate reviews per user
Prevent instructors from reviewing their own course
Auto-update course’s average rating
Fetch all reviews (with user & course details)
Fully validated, secure review flow


🤖 AI-Powered Search Module:-
Intelligent search using Google Gemini API
Understands user intent (semantic search)
Maps query → best matching category/level

Fallback system:
1️⃣ First try normal DB regex search
2️⃣ If not found → AI keyword extraction → search again

Clean, accurate course discovery
Fully optimized & production-ready controller.


🧪 API Testing:-
All APIs fully tested using Postman including:
Authentication
Course CRUD
Lecture CRUD
Payments
Reviews
AI Search
