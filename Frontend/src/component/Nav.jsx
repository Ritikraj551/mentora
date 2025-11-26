import React, { useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { GiSplitCross } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHam, setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log(result.data);
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10">
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src="/assets/logo.jpg"
            alt="logo"
            className="w-[60px] rounded-[5px] border-2 border-white"
          />
        </div>
        <div className="hidden w-[30%] lg:flex items-center justify-center gap-4">
          {!userData && (
            <IoPersonCircle
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] fill-black cursor-pointer"
            />
          )}
          {userData?.photoUrl ? (
            <img
              onClick={() => setShow((prev) => !prev)}
              src={userData?.photoUrl}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            />
          ) : (
            <div
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          {userData?.role === "educator" && (
            <div className="px-5 py-2.5 border-2 lg:border-white border-black lg:text-white bg-black text-black rounded-[10px] text-[18px] font-light cursor-pointer">
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="px-5 py-2.5 border-2 border-white text-white rounded-[10px] text-[18px] font-light cursor-pointer bg-[#000000d5]"
            >
              Login
            </span>
          ) : (
            <span
              onClick={handleLogout}
              className="px-5 py-2.5 bg-white text-black rounded-[10px] shadow-sm shadow-black text-[18px] cursor-pointer"
            >
              Logout
            </span>
          )}
          {show && (
            <div className="absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-2.5 border-2 border-black hover:border-white hover:text-white cursor-pointer hover:bg-black">
              <span
                onClick={() => navigate("/profile")}
                className="bg-black text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600"
              >
                My Profile
              </span>
              <span className="bg-black text-white px-[30px] py-2.5 rounded-2xl hover:bg-gray-600">
                My Courses
              </span>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        <RxHamburgerMenu
          onClick={() => setShowHam((prev) => !prev)}
          className="w-[35px] h-[35px] lg:hidden text-white cursor-pointer"
        />
        <div
          className={`fixed top-0 left-0 w-screen h-screen bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${
            showHam
              ? "translate-x-0 transition duration-600"
              : "-translate-x-full transition duration-600"
          }`}
        >
          <GiSplitCross
            onClick={() => setShowHam((prev) => !prev)}
            className="w-[35px] h-[35px] fill-white absolute top-5 right-[4%]"
          />
          {!userData && (
            <IoPersonCircle className="w-[50px] h-[50px] fill-black cursor-pointer" />
          )}
          {userData?.photoUrl ? (
            <img
              src={userData?.photoUrl}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            />
          ) : (
            <div
              onClick={() => setShow((prev) => !prev)}
              className="w-[50px] h-[50px] rounded-full text-white flex items-center justify-center text-[20px] border-2 bg-black border-white cursor-pointer"
            >
              {userData?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}
          <div
            onClick={() => navigate("/profile")}
            className="w-[200px] h-20 flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"
          >
            My Profile
          </div>
          <div className="w-[200px] h-20 flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
            My Courses
          </div>
          {userData?.role === "educator" && (
            <div className="w-[200px] h-20 flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer">
              Dashboard
            </div>
          )}
          {!userData ? (
            <span
              onClick={() => navigate("/login")}
              className="w-[200px] h-20 flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              Login
            </span>
          ) : (
            <span
              onClick={handleLogout}
              className="w-[200px] h-20 flex items-center justify-center border-2 border-white text-white bg-black rounded-[10px] text-[18px] font-light cursor-pointer"
            >
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
