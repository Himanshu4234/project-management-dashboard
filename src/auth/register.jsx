import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Store success/error messages
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Registration successful! Redirecting to Dashboard...");
      setTimeout(() => {
        navigate("/userPage"); // Redirect after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage(error.message); // Show error message
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="LoginPageContainer">
      <div className="register_page_header" style={{ textAlign: "center", minWidth: "400px", maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
        <h2 className="loginHeading registerPage">Register</h2>
        
        {/* Show success or error message */}
        {message && (
          <p style={{ color: message.includes("successful") ? "green" : "red", fontSize: "16px" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="register_button" type="submit" style={{ textAlign: "center",background: "#1a1aa7bf",color: "#ffffff"}} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
