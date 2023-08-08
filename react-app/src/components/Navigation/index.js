import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
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
            <div className="navbar-inner">
              <NavLink exact to="/drinks">
                Drinks List
              </NavLink>
              <NavLink exact to="/drinks/top-rated">
                Top Drinks
              </NavLink>
              <ProfileButton user={sessionUser} />
              <input
                className="nav-search"
                type="text"
                placeholder="Search coming soon..."
              />
            </div>
          ) : (
            <>
              <NavLink exact to="/drinks">
                Drinks List
              </NavLink>
              <NavLink exact to="/drinks/top-rated">
                Top Drinks
              </NavLink>
              <NavLink exact to="/login">
                Sign In
              </NavLink>
              <NavLink exact to="/signup">
                Join Now
              </NavLink>
              <input
                className="nav-search"
                type="text"
                placeholder="Search coming soon..."
              />
            </>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default Navigation;
