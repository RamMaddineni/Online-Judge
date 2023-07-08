import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatcher = useDispatch();
  console.log("user", user);
  const [profile, setProfile] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    console.log("user line 12", user);
    const getUser = async () => {
      try {
        console.log(user.email);
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
        if (error?.response?.USER === false) {
          navigate("/");
        }
      }
    };

    getUser();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.get(`http://localhost:3001/api/v1/logout`, {
        withCredentials: true,
      });
      // setUser("");
      dispatcher(logout());
      localStorage.removeItem("user");
      localStorage.removeItem("lastLocation");
      navigate("/");
    } catch (error) {
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
      <div
        onClick={(e) => {
          e.preventDefault();
          navigate("/problems");
        }}
      >
        problem page
      </div>
      <div className="profile-logout" onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

export default Profile;
