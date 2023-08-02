import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./LoginForm.css";
import logo from "../../assets/logo.png";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <div className="login-form-logo">
          <img src={logo} alt="Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-form-input-container">
            <i className="fa-solid fa-user" style={{ color: "#c7c7c7" }}></i>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-form-input-container">
            <i className="fa-solid fa-lock" style={{ color: "#c7c7c7" }}></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Sign In
          </button>
          <button type="button" className="demo-login-button">
            Demo Login
          </button>
        </form>
        <div className="login-form-signup">
          New around here? <span>Sign up!</span>
        </div>
      </div>
    </div>
  );
}

export default LoginFormPage;
