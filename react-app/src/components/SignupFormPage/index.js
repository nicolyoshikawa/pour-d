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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(
        signUp(username, email, password, firstName, lastName, birthday)
      );
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Passwords do not match."]);
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
        {errors.length > 0 && (
          <div className="signup-form-container-errors">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <p className="signup-form-required-text">
            All fields below are required unless specified
          </p>
          <div className="signup-form-input-group">
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
          </div>
          <p className="signup-form-password-text">
            Avoid using common words and include a mix of letters and numbers.
          </p>
          <div className="signup-form-input-group">
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
          </div>
          <div className="signup-form-input-group-names">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="signup-form-input-group-birthday">
            <label htmlFor="birthday">Birthday:</label>
            <input
              type="date"
              id="birthday"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </div>
          <div className="caption-div">
            <p className="caption-text">
              You must be of legal drinking age in your country to join Pour'd. By
              clicking Create Account, you agree to our non-existent Terms of Use and
              Privacy Policy.
            </p>
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
