import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user";
import DifficultyCircle from "./DifficultyCircle";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatcher = useDispatch();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { domain } = useSelector((state) => state.domain);

  // useEffect(() => {
  //   localStorage.setItem("lastLocation", window.location.pathname);
  // }, []);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.post(
          `${domain}/api/v1/profile`,
          {
            email: user.email,
          },
          {
            withCredentials: true,
          }
        );
        setProfile(response.data?.profile);
        console.log(response.data.profile);
        setLoading(false);
        console.log("profile", profile);
      } catch (error) {
        setError(error.message);
        console.log(error.message);
        setLoading(false);
        if (error?.response?.USER === false) {
          navigate("/");
        }
      }
    };
    getUser();
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get(`${domain}/api/v1/logout`, {
        withCredentials: true,
      });
      setError(null);
      dispatcher(logout());
      localStorage.removeItem("user");
      localStorage.removeItem("lastLocation");
      navigate("/");
    } catch (error) {
      setError("Logout failed. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-around w-full h-screen bg-teal-200">
      <div className="bg-white max-w-md mx-auto shadow-md rounded-lg ">
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
          {/* Add progress bar or any other statistics here */}
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
            className="font-bold cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/compiler")}
          >
            Online Compiler
          </div>
          <div
            className="font-bold cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/problems")}
          >
            Problem Page
          </div>
          <div
            className="font-bold cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md"
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
