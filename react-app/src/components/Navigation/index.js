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
    <div className="navBar">
      <NavLink exact to="/">
        <img className="nav-logo" src={logo} alt="Logo" />
      </NavLink>
      {isLoaded && (
        <>
          {/* {sessionUser && (
            <>
              <NavLink exact to="/drinks">
                Drinks List
              </NavLink>
              <NavLink exact to="/drinks/top-rated">
                Top Drinks
              </NavLink>
              <input className="nav-search" type='text' placeholder='Search coming soon...'/>
            </>
          )}
          <ProfileButton user={sessionUser} /> */}
          {sessionUser ? (
            <>
              <NavLink exact to="/drinks">
                Drinks List
              </NavLink>
              <NavLink exact to="/drinks/top-rated">
                Top Drinks
              </NavLink>
              <NavLink exact to="/check-ins">
                Check-in History
              </NavLink>
              <NavLink exact to="/friends">
                Friends
              </NavLink>
              <NavLink exact to="/my-profile">
                My Profile
              </NavLink>
              <NavLink exact to="/edit-profile">
                Edit Profile
              </NavLink>
              <NavLink exact to="/drinks/new">
                Create a Drink
              </NavLink>
            </>
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
          )}
        </>
      )}
    </div>
  );
}

export default Navigation;
