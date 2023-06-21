import React from "react";
import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("/api/v1/auth/google");
      if (response.data.success) {
        console.log(response.data);
        return;
      }
      console.log(`Login Failed , ${response.data.message}`);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleSubmit = async (e) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/login", {
        email: email,
        password: password,
      });
      if (response.data.success) {
        console.log(response.data);

        // navigate("/problems");
        return;
      }
      console.log(`Login Failed , ${response.data.message}`);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <form
        action=""
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Sign Up
        </button>
      </form>
      {/* <form action="http://localhost:3001/api/v1/auth/google" method="get">
        <input type="submit" value="Press to log in with Google" />
      </form> */}
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </>
  );
};

export default Login;
