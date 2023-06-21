import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/register",
        {
          email: email,
          password: password,
        }
      );
      if (response.data.success) {
        // console.log(response.data);
        console.log("Signup Successful");
        navigate("/");
        return;
      }
      console.log(`Signup Failed , ${response.data.message}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <form
      onChange={(e) => {
        e.preventDefault();
      }}
    >
      <h2>email</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <h2>password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <h2>confirm password</h2>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button type="submit" onClick={handleSubmit}>
        Sign Up
      </button>
    </form>
  );
}

export default SignUp;
