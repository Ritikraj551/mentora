import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  return (
    <div className="bg-black text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-10 lg:gap-[150px] flex-col lg:flex-row">
        <div className="lg:w-[40%] md:w-[50%] w-full">
          <img
            src="/assets/logo.jpg"
            className="h-10 mb-3 border rounded-[5px]"
          />
          <h2 className="text-xl font-bold text-white mb-3">Mentora</h2>
          <p className="text-sm">
            AI Powered learnign platform to help you grow smarter. Learn
            anything, anytime, anywhere.
          </p>
        </div>

        <div className="lg:w-[30%] md:w-full"></div>

        <div className="text-white font-semibold mb-2">Quick Links</div>
        <ul className="text-sm space-y-1">
          <li
            onClick={() => navigate("/")}
            className="hover:text-white cursor-pointer"
          >
            Home
          </li>
          <li
            onClick={() => navigate("/allcourses")}
            className="hover:text-white cursor-pointer"
          >
            All Courses
          </li>
          <li
            onClick={() => navigate("/login")}
            className="hover:text-white cursor-pointer"
          >
            Login
          </li>
          <li
            onClick={() => navigate("/profile")}
            className="hover:text-white cursor-pointer"
          >
            My Profile
          </li>
        </ul>
      </div>

      <div className="max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-10 lg:gap-[150px] flex-col lg:flex-row">
        <div className="lg:w-[40%] md:w-[50%] w-full">
          <img
            src="/assets/logo.jpg"
            className="h-10 mb-3 border rounded-[5px]"
          />
          <h2 className="text-xl font-bold text-white mb-3">Mentora</h2>
          <p className="text-sm">
            AI Powered learnign platform to help you grow smarter. Learn
            anything, anytime, anywhere.
          </p>
        </div>

        <div className="lg:w-[30%] md:w-full"></div>

        <div className="text-white font-semibold mb-2">Categories</div>
        <ul className="text-sm space-y-1">
          <li className="hover:text-white">Web Development</li>
          <li className="hover:text-white">App Development</li>
          <li className="hover:text-white">AI/ML</li>
          <li className="hover:text-white">UI/UX Designing</li>
        </ul>
      </div>
      <div className="border-t border-gray-700 mt-10 pt-5 text-sm text-center text-gray-500">
        © {new Date().getFullYear()}Mentora. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
