import React, { useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import getCreatorCourse from "../../customHooks/getCreatorCourse";

const Courses = () => {
  const navigate = useNavigate();
  const { creatorCourseData } = useSelector((state) => state.course);
  getCreatorCourse();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full min-h-screen p-4 sm:p-6 bg-gray-100">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <div className="flex items-center justify-center gap-3">
            <FaArrowLeftLong
              onClick={() => navigate("/dashboard")}
              className="w-[22px] h-[22px] cursor-pointer"
            />
            <h1 className="text-2xl font-semibold">All created courses</h1>
          </div>
          <button
            onClick={() => navigate("/createcourse")}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-500 cursor-pointer"
          >
            Create Course
          </button>
        </div>

        {/* for large screen table */}
        <div className="hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4">Courses</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {creatorCourseData?.map((course, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200"
                >
                  <td className="py-3 px-4 flex items-center gap-4">
                    {course?.thumbnail ? (
                      <img
                        src={course?.thumbnail}
                        className="w-25 h-14 object-cover rounded-md"
                        alt=""
                      />
                    ) : (
                      <img
                        src="/assets/empty.jpg"
                        className="w-25 h-14 object-cover rounded-md"
                        alt=""
                      />
                    )}
                    <span>{course?.title}</span>
                  </td>
                  {course?.price ? (
                    <td className="px-4 py-3">₹{course?.price}</td>
                  ) : (
                    <td className="px-4 py-3">₹ NA</td>
                  )}
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        course?.isPublished
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <FaEdit
                      onClick={() => navigate(`/editcourse/${course?._id}`)}
                      className="text-gray-600 hover:text-blue-600 cursor-pointer"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-center text-sm text-gray-400 mt-6">
            A list of your recent courses.
          </p>
        </div>

        {/* for small screen */}
        <div className="md:hidden space-y-4">
          {creatorCourseData?.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col gap-3"
            >
              <div className="flex gap-4 items-center">
                {course?.thumbnail ? (
                  <img
                    src={course?.thumbnail}
                    className="w-16 h-16 rounded-md object-cover"
                  />
                ) : (
                  <img
                    src="/assets/empty.jpg"
                    className="w-16 h-16 rounded-md object-cover"
                  />
                )}
                <div className="flex-1">
                  <h2 className="font-medium text-sm">{course.title}</h2>
                  {course?.price ? (
                    <p className="text-gray-600 text-xs mt-1">
                      ₹{course?.price}
                    </p>
                  ) : (
                    <p className="text-gray-600 text-xs mt-1">₹ NA</p>
                  )}
                </div>
                <FaEdit
                  onClick={() => navigate(`/editcourse/${course?._id}`)}
                  className="text-gray-600 hover:text-blue-600 cursor-pointer"
                />
              </div>

              <span
                className={`w-fit px-3 py-1 text-xs rounded-full ${
                  course?.isPublished
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {course.isPublished ? "Published" : "Draft"}
              </span>
            </div>
          ))}
          <p className="text-center text-sm text-gray-400 mt-4">
            A list of your recent courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
