import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { setCourseData } from "../../redux/courseSlice";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const thumb = useRef;
  const [isPublished, setIsPublishd] = useState(false);
  const [selectCourse, setSelectCourse] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState("");
  const [frontendImage, setFrontendImage] = useState("/assets/empty");
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const getCourseById = async () => {
    try {
      const result = await axios.get(
        serverUrl + `/api/course/getcourse/${courseId}`,
        { withCredentials: true }
      );
      setSelectCourse(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || "");
      setSubTitle(selectCourse.subTitle || "");
      setDescription(selectCourse.description || "");
      setCategory(selectCourse.category || "");
      setLevel(selectCourse.level || "");
      setPrice(selectCourse.price || "");
      setFrontendImage(selectCourse.thumbnail || "/assets/empty.jpg");
      setIsPublishd(selectCourse?.isPublished);
    }
  }, [selectCourse]);

  useEffect(() => {
    getCourseById();
  }, []);

  const handleEditCourse = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("level", level);
    formData.append("price", price);
    formData.append("thumbnail", backendImage);
    formData.append("isPublished", isPublished);

    try {
      const result = await axios.post(
        serverUrl + `api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      const updateData = result.data;
      if (updateData.isPublished) {
        const updateCourses = courseData.map((c) =>
          c._id === courseId ? updateData : c
        );
        if (!courseData.some((c) => c._id === courseId)) {
          updateCourses.push(updateData);
        }
        dispatch(setCourseData(updateCourses));
      } else {
        const filterCourse = courseData.filter((c) => c._id !== courseId);
        dispatch(setCourseData(filterCourse));
      }
      setLoading(false);
      navigate("/courses");
      toast.success("Course Updated");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveCourse = async () => {
    setLoading1(true);
    try {
      const result = await axios.delete(
        serverUrl + `/api/course/remove/${courseId}`,
        { withCredentials: true }
      );
      console.log(result.data);
      const filterCourse = courseData.filter((c) => c._id !== courseId);
      dispatch(setCourseData(filterCourse));
      setLoading1(false);
      toast.success("Course Removed");
      navigate("/courses");
    } catch (error) {
      console.log(error);
      setLoading1(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      {/* top bar */}
      <div className="flex items-center justify-center gap-5 md:justify-between flex-col md:flex-row mb-6 relative">
        <FaArrowLeftLong
          onClick={() => navigate("/courses")}
          className="top-[-20%] md:top-[20%] absolute left-0 md:left-[2%] w-[22px] h-[22px] cursor-pointer"
        />
        <h2 className="text-2xl font-semibold md:pl-[60px]">
          Add detailed information regarding the course
        </h2>
        <div className="space-x-2 space-y-2">
          <button className="bg-black text-white px-4 py-2 rounded-md">
            Go to lectures page
          </button>
        </div>
      </div>

      {/* form details */}
      <div className="bg-gray-50 p-6 rounded-md">
        <h2 className="text-lg font-medium mb-4">Basic Course Information</h2>
        <div className="space-x-2 spce-y-2">
          {!isPublished ? (
            <button
              onClick={() => setIsPublishd((prev) => !prev)}
              className="bg-green-100 text-green-600 px-4 py-2 rounded-md border"
            >
              Click to Publish
            </button>
          ) : (
            <button
              onClick={() => setIsPublishd((prev) => !prev)}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-md border"
            >
              Click to Unpublish
            </button>
          )}
          <button
            onClick={handleRemoveCourse}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Remove Course
          </button>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="title"
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course Title"
            />
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subtitle
            </label>
            <input
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
              id="subtitle"
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Course SubTitle"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              id="description"
              type="text"
              className="w-full border px-4 py-2 rounded-md h-24 resize-none"
              placeholder="Course Description"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 sm:space-y-0">
            {/* for category */}
            <div className="flex-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Category
              </label>
              <select
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                id="category"
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select category</option>
                <option value="App Development">App Development</option>
                <option value="AI/ML">AI/ML</option>
                <option value="AI Tools">AI Tools</option>
                <option value="Data Science">Data Science</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Ethical Hacking">Ethical Hacking</option>
                <option value="UI UX Designing">UI UX Designing</option>
                <option value="Web Development">Web Development</option>
                <option value="Others">Others</option>
              </select>
            </div>

            {/* for level */}
            <div className="flex-1">
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Level
              </label>
              <select
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                id="level"
                className="w-full border px-4 py-2 rounded-md bg-white"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            {/* for price */}
            <div className="flex-1">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Course Price (INR)
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                id="price"
                type="number"
                placeholder="₹"
                className="w-full border px-4 py-2 rounded-md"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course Thumbnail
            </label>
            <input
              onChange={handleThumbnail}
              hidden
              ref={thumb}
              accept="image/*"
              id="thumbnail"
              type="file"
            />
          </div>
          <div className="relative w-[300px] h-[170px]">
            <img
              onClick={() => thumb.current.click()}
              src={frontendImage}
              className="w-full border border-black rounded-[5px]"
            />
            <FaEdit
              onClick={() => thumb.current.click()}
              className="w-5 h-5 absolute top-2 right-2"
            />
          </div>
          <div className="flex items-center justify-start gap-[15px]">
            <button
              onClick={() => navigate("/courses")}
              className="bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleEditCourse}
              className="bg-black text-white px-7 py-2 rounded-md hover:bg-gray-500 cursor-pointer"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;
