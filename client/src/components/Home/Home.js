import React from "react";
import GoogleLogin from "../login/GoogleLogin";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <div className="Home-Left">
        <GoogleLogin />
        <p>signup or login</p>
      </div>
      <div className="Home-Right">
        <h1>Login</h1>
        <form method="post">
          <div className="Home-txt_field">
            <input type="text" required />
            <span></span>
            <label>Username</label>
          </div>
          <div className="Home-txt_field">
            <input type="password" required />
            <span></span>
            <label>Password</label>
          </div>
          <div className="Home-pass">Forgot Password?</div>
          <input
            type="submit"
            className="Home-form-submit-input"
            value="Login"
          />
          <div className="Home-signup_link">
            Not a member? <p>Signup</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
