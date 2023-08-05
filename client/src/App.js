import { useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import CodeEditorUp from "./components/CodeEditor/CodeEditorUp";
import SignUp from "./components/signup/SignUp";
import Home from "./components/Home/Home";
import Profile from "./components/profile/Profile";
import Problems from "./components/problems/Problems";
import React from "react";
import Problem from "./components/problems/Problem";
import { login } from "./redux/user";
function App() {
  const { user } = useSelector((state) => state.user);
  const dispatcher = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const lastLogin = localStorage.getItem("lastLogin");

    if (lastLogin) {
      const time = Date.now() - lastLogin;
      if (time > 1000 * 60 * 60 * 30) {
        localStorage.removeItem("user");
        localStorage.removeItem("lastLogin");
        localStorage.removeItem("lastLocation");
      } else {
        const lastLocation = localStorage.getItem("lastLocation");
        const currentProblem = localStorage.getItem("currentProblem");
        dispatcher(login(JSON.parse(localStorage.getItem("user"))));
        if (lastLocation && currentProblem) {
          navigate(lastLocation);
        }
      }
    }
  }, []);
  return (
    <Routes>
      {!user && <Route path="/" element={<Home />}></Route>}
      {!user && <Route path="/register" element={<SignUp />}></Route>}
      {user && <Route path="/profile" element={<Profile />}></Route>}

      {user && (
        <Route
          path="/compiler"
          element={<CodeEditorUp>Problems</CodeEditorUp>}
        />
      )}
      {user && <Route path="/problems" element={<Problems />} />}
      {user && <Route path="/problem" element={<Problem />} />}

      {user && (
        <Route path="*" element={<Navigate to="/profile"></Navigate>}></Route>
      )}

      <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
}

export default App;
