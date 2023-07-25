import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user";
import jwt_decode from "jwt-decode";
import { setErrorMessage } from "../../redux/errorMessage";
import { useSelector } from "react-redux";
function GoogleLogin() {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const { domain } = useSelector((state) => state.domain);
  const handleCallbackResponse = async (response) => {
    console.log("Encode Jwt : ", response.credential);
    let userObject = jwt_decode(response.credential);
    console.log("Decode Jwt : ", userObject);
    const _user = {
      email: userObject.email,
    };

    try {
      const response = await axios.post(
        `${domain}/api/v1/auth/google/login`,
        {
          name: userObject.name,
          email: userObject.email,
          password: userObject.sub,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(_user));
        // setUser(_user);
        dispatcher(login(_user));
        navigate("/profile");
      } else {
        response.data.message && setErrorMessage(response.data.message);
      }
    } catch (err) {
      console.log(err);
      (err.response.data.message &&
        dispatcher(setErrorMessage(err.response.data.message))) ||
        dispatcher(setErrorMessage(err.message));
    }
  };
  useEffect(() => {
    const google = window.google;
    google?.accounts?.id.initialize({
      client_id:
        "495337380519-ji1hsn7bsmjgjd4lln75lhu5lluq2nv4.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google?.accounts?.id.renderButton(
      document.getElementById("google-login-button"),
      { theme: "outline", width: "20%", height: 50 }
    );
  }, []);
  return <div id="google-login-button"></div>;
}

export default GoogleLogin;
