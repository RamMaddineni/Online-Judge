import React, { useEffect, useState } from "react";
import GoogleLogin from "../authProviders/GoogleLogin";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Home = ({ user, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
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
        setUser({ email: email });
        localStorage.setItem("user", JSON.stringify({ email: email }));

        navigate("/profile");
        return;
      }
      setErrorMessage("Try Again !");
    } catch (err) {
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
            <div>
              login/signUp with{" "}
              <GoogleLogin
                user={user}
                setUser={setUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />{" "}
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
