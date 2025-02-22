import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // For success/error messages
  const navigate = useNavigate();

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Login Successful! Redirecting to Dashboard...");
      
      setTimeout(() => navigate("/userPage"), 2000); // Redirect after 2s
    } catch (error) {
      console.error("Login Error:", error.message);
      setMessage("❌ " + error.message);
    }
  };

  // Handle Google Sign-In
  const provider = new GoogleAuthProvider();
  const handleGoogleSignIn = async () => {
    setMessage("");

    try {
      const result = await signInWithPopup(auth, provider);
      setMessage(`✅ Welcome ${result.user.displayName}! Redirecting to Dashboard...`);
      
      setTimeout(() => navigate("/userPage"), 2000);
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      setMessage("❌ " + error.message);
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("❌ Please enter your email first!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("📩 Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Password Reset Error:", error.message);
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="LoginPageContainer">
    <div style={{ textAlign: "center", maxWidth: "400px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px" }}>
      <h2 className="loginHeading">Login</h2>
      
      {message && <p style={{ color: message.includes("❌") ? "red" : "green" }}>{message}</p>}
      
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ padding: "10px", width: "100%", marginTop: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Login
        </button>
      </form>

      <button onClick={handleGoogleSignIn} style={{ marginTop: "10px", padding: "10px", width: "100%", background: "#db4437", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        Sign in with Google
      </button>

      <button onClick={handleForgotPassword} style={{ marginTop: "10px", padding: "10px", width: "100%", background: "none", border: "none", color: "blue", cursor: "pointer" }}>
        Forgot Password?
      </button>
      <button style={{ marginTop: "10px", padding: "10px", width: "100%", background: "#db4437", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
        <a  className="register_button" href="/register">Don't Have An Account? </a>
      </button>
    </div>
    </div>
  );
};

export default Login;
