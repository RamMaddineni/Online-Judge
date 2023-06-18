import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>login component</h1>}></Route>
        <Route path="/register" element={<h1> Register component</h1>}></Route>
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
