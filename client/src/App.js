import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import CodeEditor from "./components/CodeEditor/CodeEditor";
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
  useEffect(() => {
    dispatcher(login(JSON.parse(localStorage.getItem("user"))));
  }, []);
  return (
    <Router>
      <Routes>
        {!user && <Route path="/" element={<Home />}></Route>}
        {!user && <Route path="/register" element={<SignUp />}></Route>}
        {user && <Route path="/profile" element={<Profile />}></Route>}

        {user && (
          <Route path="/compiler" element={<CodeEditor>Problems</CodeEditor>} />
        )}
        {user && <Route path="/problems" element={<Problems />} />}
        {user && <Route path="/problem" element={<Problem />} />}

        {user && (
          <Route path="*" element={<Navigate to="/profile"></Navigate>}></Route>
        )}

        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
