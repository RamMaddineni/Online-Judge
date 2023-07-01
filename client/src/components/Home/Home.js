import React, { useEffect, useState } from "react";
import GoogleLogin from "../authProviders/GoogleLogin";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/user";
import { setErrorMessage } from "../../redux/errorMessage";
const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessage } = useSelector((state) => state.errorMessage);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  useEffect(() => {}, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/local/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        const { email } = response.data;
        dispatcher(login({ email: email }));
        localStorage.setItem("user", JSON.stringify({ email: email }));

        navigate("/profile");
        return;
      }
      setErrorMessage("Try Again !");
    } catch (err) {
      dispatcher(setErrorMessage(err?.response?.data?.message));
    }
  };
  return (
    <div className="Home">
      <div className="Home-Right">
        <form
          className="Home-form"
          method=""
          onSubmit={(e) => e.preventDefault()}
        >
          <h2 className="Home-h2 ">Login</h2>
          {errorMessage && (
            <div className="Home-txt_field" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <div className="Home-txt_field">
            <input
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
              required
            />
            <span></span>
            <label>email</label>
          </div>
          <div className="Home-txt_field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
            />
            <span></span>
            <label>Password</label>
          </div>
          <input
            className="Home-form-submit-input"
            type="submit"
            value="Login"
            onClick={(e) => {
              handleLogin(e);
            }}
          />
          <div className="Home-google-button">
            <div>
              login/signUp with <GoogleLogin />{" "}
            </div>
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
