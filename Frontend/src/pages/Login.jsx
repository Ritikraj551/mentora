import React, { useState } from "react";
import { IoEyeOutline, IoEye } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";
import { toast } from "react-toastify";
import axios from "axios";
import { setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { FaArrowLeftLong } from "react-icons/fa6";

function Login() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider);
      let user = response.user;
      let name = user.displayName;
      let email = user.email;
      let role = "";

      const result = await axios.post(
        serverUrl + "/api/auth/googleauth",
        { name, email, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      navigate("/");
      toast.success("Logged In Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-[#dddbdb] w-screen h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex"
      >
        <FaArrowLeftLong
          onClick={() => navigate("/")}
          className="absolute top-[3%] md:top-[6%] left-[5%] w-[22px] h-[22px] cursor-pointer"
        />
        {/* Left div */}
        <div className="md:w-[50%] w-full h-full flex flex-col items-center justify-center gap-3">
          <div>
            <h1 className="font-semibold text-black text-2xl">Welcome Back</h1>
            <h2 className="text-[#999797] text-[18px]">
              Login into your account
            </h2>
          </div>
          <div className="flex flex-col gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="Your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="flex flex-col relative gap-1 w-[80%] items-start justify-center px-3">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              id="password"
              type={show ? "text" : "password"}
              className="border w-full h-[35px] border-[#e7e6e6] text-[15px] px-5"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show ? (
              <IoEyeOutline
                className="absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            ) : (
              <IoEye
                className="absolute w-5 h-5 cursor-pointer right-[5%] bottom-[10%]"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-[80%] h-10 bg-black text-white cursor-pointer flex items-center justify-center rounded-[5px]"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>
          <span
            onClick={() => navigate("/forget")}
            className="text-[13px] cursor-pointer text-[#585757]"
          >
            Forget your password ?
          </span>
          <div className="w-[80%] flex items-center gap-2">
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
            <div className="w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center">
              Or continue
            </div>
            <div className="w-[25%] h-[0.5px] bg-[#c4c4c4]"></div>
          </div>
          <div
            onClick={googleLogin}
            className="w-[80%] h-10 border border-black rounded-[5px] flex items-center justify-center"
          >
            <img src="/assets/google.jpg" className="w-[25px]" alt="" />
            <span className="text-[18px] text-gray-500">oogle</span>
          </div>
          <div className="text-[#6f6f6f]">
            Create a new account
            <span
              onClick={() => navigate("/signup")}
              className="underline underline-offset-1 text-black"
            >
              SignUp
            </span>
          </div>
        </div>

        {/* Right div */}
        <div className="w-[50%] h-full rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden">
          <img src="/assets/logo.jpg" alt="logo" className="w-30 shadow-2xl" />
          <span className="text-2xl text-white">MENTORA</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
