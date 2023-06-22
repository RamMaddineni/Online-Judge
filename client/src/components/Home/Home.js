import React from "react";
import GoogleLogin from "../authProviders/GoogleLogin";
import "./Home.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="Home">
      <div className="Home-Left">
        {/* <h4>Login / SignUp</h4> */}
        <GoogleLogin />
        <p>signup or login</p>
      </div>
      <div className="Home-Right">
        <form method="post">
          <h2>Login</h2>
          <div className="Home-txt_field">
            <input type="text" required />
            <span></span>
            <label>User ID</label>
          </div>
          <div className="Home-txt_field">
            <input type="password" required />
            <span></span>
            <label>Password</label>
          </div>
          {/* <div className="Home-pass">Forgot Password?</div> */}
          <input
            type="submit"
            className="Home-form-submit-input"
            value="Login"
          />
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
