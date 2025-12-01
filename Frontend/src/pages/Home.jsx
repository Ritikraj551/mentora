import React from "react";
import Nav from "../component/Nav";
import { SiViaplay } from "react-icons/si";
import Logos from "../component/Logos";
import ExploreCourses from "../component/ExploreCourses";
import CardPage from "../component/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../component/About";
import Footer from "../component/Footer";
import ReviewPage from "../component/ReviewPage";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Nav />
        <img
          src="/assets/home1.jpg"
          className="object-cover md:object-fill w-full lg:h-full h-[50vh]"
        />
        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-full flex items-center justify-center text-white font-bold text-[20px]">
          Grow Your Skills to Advance
        </span>
        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-full flex items-center justify-center text-white font-bold text-[20px]">
          Your Career Path
        </span>
        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-full flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => navigate("/allcourses")}
            className="px-5 py-2.5 border-2 lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
          >
            View All Courses
            <SiViaplay className="w-[30px] h-[30px] lg:fill-white fill-black" />
          </button>
          <button
            onClick={() => navigate("/search")}
            className="px-5 py-2.5 lg:bg-white bg-black border-2 lg:border-white border-black lg:text-black text-white rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer"
          >
            Search With AI
            <img
              src="/assets/ai.png"
              className="w-[30px] h-[30px] rounded-full hidden lg:block"
              alt=""
            />
            <img
              src="/assets/SearchAi.png"
              className="w-[35px] h-[35px] rounded-full lg:hidden"
              alt=""
            />
          </button>
        </div>
      </div>
      <Logos />
      <ExploreCourses />
      <CardPage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  );
};

export default Home;
