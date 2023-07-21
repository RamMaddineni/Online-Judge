import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user";
import DifficultyCircle from "./DifficultyCircle";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatcher = useDispatch();
  const [profile, setProfile] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `/api/v1/profile`,
          {
            email: user.email,
          },
          {
            withCredentials: true,
          }
        );
        setProfile(response.data?.profile);
      } catch (error) {
        if (error?.response?.USER === false) {
          navigate("/");
        }
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`/api/v1/logout`, {
        withCredentials: true,
      });
      dispatcher(logout());
      localStorage.removeItem("user");
      localStorage.removeItem("lastLocation");
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-around w-full  h-screen  bg-[cadetblue]">
      <div className="bg-white max-w-md mx-auto  shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">Profile</div>
          <p className="text-gray-700 text-base">
            Welcome back,{" "}
            <span className="font-bold">{profile?.name || "User"}</span>!
          </p>
          <p className="text-gray-700 text-base">
            You have solved{" "}
            <span className="font-bold">{profile?.solvedProblems || 0}</span>{" "}
            problems so far.
          </p>
          <div className="mt-4">
            <DifficultyCircle
              count={profile?.easyCount || 0}
              difficulty="easy"
            />
            <DifficultyCircle
              count={profile?.mediumCount || 0}
              difficulty="medium"
            />
            <DifficultyCircle
              count={profile?.hardCount || 0}
              difficulty="hard"
            />
          </div>
        </div>

        <div className="px-6 py-4 flex justify-between border-t border-gray-200">
          <div
            className=" font-bold cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/compiler")}
          >
            Online Compiler
          </div>
          <div
            className=" font-bold cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/problems")}
          >
            Problem Page
          </div>
          <div
            className=" font-bold cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
