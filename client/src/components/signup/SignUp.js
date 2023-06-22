import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import "./SignUp.css";

function SignUp({ user, setUser, token, setToken }) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match dumb fuck! 🚺");
      return;
    }
    if (password.length < 4) {
      setErrorMessage("Password length should be atleast 4 characters bitch!");
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        {
          userId,
          email,
          password,
        }
      );
      if (response.data.success) {
        token = response.data.token;
        console.log("token : ", token);
        const { userId, email } = jwt(token);
        setUser({ userId: userId, email: email });
        setToken(token);
        navigate("/profile");
      } else if (!response.data) {
        setErrorMessage(`try once again!`);
      } else if (!response.data.duplicate && response.data.item === "email") {
        setErrorMessage(`${email} was already registered`);
      } else if (!response.data.duplicate && response.data.item === "userId") {
        setErrorMessage(`${userId} has taken 😓, try another!`);
      }
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="SignUp-background">
      <div className="SignUp">
        <form method="post">
          <h2>Sign Up</h2>
          {errorMessage && (
            <div className="SignUp-txt_field" style={{ color: "red" }}>
              {errorMessage}
            </div>
          )}
          <div className="SignUp-txt_field">
            <input
              type="text"
              required
              value={userId}
              id="userId"
              onChange={(e) => {
                setUserId(e.target.value);
                setErrorMessage("");
              }}
            />
            <span></span>
            <label>User ID</label>
          </div>

          <div className="SignUp-txt_field">
            <input
              type="email"
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
          <div className="SignUp-txt_field">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrorMessage("");
              }}
              required
            />
            <span></span>
            <label>Password</label>
          </div>
          <div className="SignUp-txt_field">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrorMessage("");
              }}
              required
            />
            <span></span>
            <label>Confirm Password</label>
          </div>
          <input
            className="SignUp-form-submit-input"
            value="Register"
            onClick={(e) => {
              handleRegister(e);
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
