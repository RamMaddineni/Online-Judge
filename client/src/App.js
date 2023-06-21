import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import Home from "./components/Home/Home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* <Route path="/" element={<Login />}></Route> */}
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/problems" element={<h1>Problems</h1>} />
        <Route path="/problem/:id" element={<h1>Problem</h1>} />
        <Route path="/admin" element={<h1>Admin</h1>} />
        <Route path="/admin/addproblem" element={<h1>Admin Problem</h1>} />
        <Route path="/admin/editproblem/:id" element={<h1>Admin Problem</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
