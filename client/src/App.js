import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// import Login from "./components/login/Login";
import "./App.css";
import SignUp from "./components/signup/SignUp";
import Home from "./components/Home/Home";

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/" element={<Login />}></Route> */}
        <Route
          path="/register"
          element={
            <SignUp
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
            />
          }
        ></Route>
        {Object.keys(user).length && (
          <Route path="/profile" element={<h1>Profile section</h1>}></Route>
        )}
        {Object.keys(user).length && (
          <Route
            path="/problems"
            element={
              <h1 token={token} user={user}>
                Problems
              </h1>
            }
          />
        )}
        {Object.keys(user).length && (
          <Route
            path="/problem/:id"
            element={
              <h1 token={token} user={user}>
                Problem
              </h1>
            }
          />
        )}
        {Object.keys(user).length && (
          <Route
            path="/admin"
            element={
              <h1 token={token} user={user}>
                Admin
              </h1>
            }
          />
        )}
        {Object.keys(user).length && (
          <Route
            path="/admin/addproblem"
            element={
              <h1 token={token} user={user}>
                Admin Problem
              </h1>
            }
          />
        )}
        {Object.keys(user).length && (
          <Route
            path="/admin/editproblem/:id"
            element={
              <h1 token={token} user={user}>
                Admin Problem
              </h1>
            }
          />
        )}
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
