import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./auth/login.jsx";
import Register from "./auth/register.jsx";
import Home from "./Pages/home.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userPage" element={<Home />} />
        <Route
          path="/"
          element={
            <div className="HomePageMain">
            <div className="Home_page_main">
              <h1>Welcome to Project Management Dashboard</h1>
              <p className="login-register-button">
                <a href="/login" className="login_button">Login</a>  <a href="/register" className="registerButton">Register</a>
              </p>
            </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
