import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";
import "./SignUp.css";

function SignUp({ user }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage("Fill All fields");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    if (password.length < 4) {
      setErrorMessage("Password length should be atleast 4 characters .");
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/register",
        {
          name,
          email,
          password,
        }
      );
      console.log(response.data);
      if (response.data.success) {
        navigate("/");
      } else if (!response.data) {
        setErrorMessage(`try once again!`);
      }
    } catch (err) {
      console.log(err);

      setErrorMessage(err?.response?.data?.message);
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
              value={name}
              id="userId"
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage("");
              }}
              required
            />
            <span></span>
            <label>name</label>
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
            type="submit"
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
