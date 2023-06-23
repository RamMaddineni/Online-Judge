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
  const [user, setUser] = useState();
  return (
    <Router>
      <Routes>
        {!user && (
          <Route
            path="/"
            element={<Home user={user} setUser={setUser} />}
          ></Route>
        )}
        {/* <Route path="/" element={<Login />}></Route> */}
        {!user && (
          <Route path="/register" element={<SignUp user={user} />}></Route>
        )}
        {user && (
          <Route path="/profile" element={<h1>Profile section</h1>}></Route>
        )}
        {user && (
          <Route path="/problems" element={<h1 user={user}>Problems</h1>} />
        )}
        {user && (
          <Route path="/problem/:id" element={<h1 user={user}>Problem</h1>} />
        )}
        {/* Optional below */}
        {user && <Route path="/admin" element={<h1 user={user}>Admin</h1>} />}
        {user && (
          <Route
            path="/admin/addproblem"
            element={<h1 user={user}>Admin Problem</h1>}
          />
        )}
        {user && (
          <Route
            path="/admin/editproblem/:id"
            element={<h1 user={user}>Admin Problem</h1>}
          />
        )}
        {user && (
          <Route path="*" element={<Navigate to="/profile"></Navigate>}></Route>
        )}
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
