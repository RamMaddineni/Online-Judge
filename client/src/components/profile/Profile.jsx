import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
  console.log("user", user);
  const [profile, setProfile] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("user line 12", user);
    const getUser = async () => {
      try {
        console.log(user.userId, user.email);
        const response = await axios.post(
          `http://localhost:3001/api/v1/profile`,
          {
            email: user.email,
          },
          {
            withCredentials: true,
          }
        );

        setProfile(response.data?.profile);
      } catch (error) {
        if (error.response.USER === false) {
          navigate("/");
        }
        setErrorMessage(error?.response?.data?.message || error.message);
      }
    };

    getUser();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:3001/api/v1/logout`, {
        withCredentials: true,
      });
      setUser("");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
      navigate("/");
    }
  };
  return (
    <div className="profile">
      <h2>email : {profile?.email || "error"}</h2>
      <div
        className="profile-compiler-online"
        onClick={(e) => {
          e.preventDefault();
          navigate("/compiler");
        }}
      >
        Online Compiler
      </div>
      <div className="profile-logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Profile;
