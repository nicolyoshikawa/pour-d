import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";
import logo from "../../assets/logo.png";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        <div className="signup-form-logo-slogan">
          <a href="/">
            <img src={logo} alt="Logo" />
            <p>DRINK SOCIALLY</p>
          </a>
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="signup-form-input-container">
            <i className="fa-solid fa-user" style={{ color: "#c7c7c7" }}></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-input-container">
            <i className="fa-solid fa-envelope" style={{ color: "#c7c7c7" }}></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-input-container">
            <i className="fa-solid fa-lock" style={{ color: "#c7c7c7" }}></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-input-container">
            <i className="fa-solid fa-lock" style={{ color: "#c7c7c7" }}></i>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Create Account
          </button>
        </form>
        <div className="signup-form-login">
          Already have an account? <a href="/login">Log In</a>
        </div>
      </div>
    </div>
  );
}

export default SignupFormPage;
