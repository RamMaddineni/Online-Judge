import React, { useState } from "react";
import GoogleLogin from "../authProviders/GoogleLogin";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = ({ user, setUser }) => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/local/login",
        {
          userId,
          password,
        }
      );
      if (response.data.success) {
        const { userId, email } = response.data;
        setUser({ userId: userId, email: email });
        console.log("came here");
        navigate("/profile");
        return;
      }
      setErrorMessage("Try Again !");
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err?.response?.data?.message);
    }
  };
  return (
    <div className="Home">
      <div className="Home-Right">
        <form method="" onSubmit={(e) => e.preventDefault()}>
          <h2>Login</h2>
          {errorMessage && (
            <div className="Home-txt_field" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <div className="Home-txt_field">
            <input
              type="text"
              value={userId}
              onChange={(e) => {
                setUserId(e.target.value);
              }}
              required
            />
            <span></span>
            <label>User ID</label>
          </div>
          <div className="Home-txt_field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <span></span>
            <label>Password</label>
          </div>
          {/* <div className="Home-pass">Forgot Password?</div> */}
          <input
            className="Home-form-submit-input"
            type="submit"
            value="Login"
            onClick={(e) => {
              handleLogin(e);
            }}
          />
          <div className="Home-google-button">
            <p>
              login/signUp with <GoogleLogin />{" "}
            </p>
          </div>

          <div className="Home-signup_link">
            Not a member?{" "}
            <p
              onClick={(e) => {
                navigate("/register");
              }}
            >
              Signup
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
