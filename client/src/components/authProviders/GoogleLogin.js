import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
function GoogleLogin({ user, setUser, errorMessage, setErrorMessage }) {
  const navigate = useNavigate();
  const handleCallbackResponse = async (response) => {
    console.log("Encode Jwt : ", response.credential);
    let userObject = jwt_decode(response.credential);
    console.log("Decode Jwt : ", userObject);
    const _user = {
      userId: userObject.email,
      email: userObject.email,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/google/login",
        {
          userId: userObject.email,
          email: userObject.email,
          password: userObject.sub,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(_user));
        setUser(_user);
        navigate("/profile");
      } else {
        response.data.message && setErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      (err.response.data.message &&
        setErrorMessage(err.response.data.message)) ||
        setErrorMessage(err.message);
    }
  };
  useEffect(() => {
    const google = window.google;
    /* global google */
    google?.accounts?.id.initialize({
      client_id:
        "495337380519-ji1hsn7bsmjgjd4lln75lhu5lluq2nv4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", width: "20%", height: 50 }
    );
  }, []);
  return <div id="google-login-button"></div>;
}

export default GoogleLogin;
