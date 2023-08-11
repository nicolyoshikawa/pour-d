import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import SearchBar from "../LandingPage/SearchBar"
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import logo from "../../assets/logo.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar-container">
      <div className="navbar">
        <NavLink exact to="/">
          <img className="nav-logo" src={logo} alt="Logo" />
        </NavLink>
        {isLoaded ? (
          sessionUser ? (
            <div className="navbar-inner-container">
              <div className="navbar-inner-links">
                <NavLink exact to="/drinks">
                  Drinks List
                </NavLink>
                <NavLink exact to="/drinks/top-rated">
                  Top Drinks
                </NavLink>
              </div>
              <div className="navbar-inner-profile-search">
                <ProfileButton user={sessionUser} />
                <div className="nav-search">
                  <SearchBar classStyle={"search-input-nav"}/>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-inner-container">
              <div className="navbar-inner-links">
                <NavLink exact to="/drinks">
                  Drinks List
                </NavLink>
                <NavLink exact to="/drinks/top-rated">
                  Top Drinks
                </NavLink>
              </div>
              <div className="navbar-inner-login-signup">
                <NavLink exact to="/login">
                  Sign In
                </NavLink>
                <NavLink className="navbar-inner-signup" exact to="/signup">
                  Join Now
                </NavLink>
              </div>
              <input
                className="nav-search"
                type="text"
                placeholder="Search coming soon..."
              />
            </div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Navigation;
