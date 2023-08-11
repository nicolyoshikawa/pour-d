import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());
    history.push("/")
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div className="profile-button">
      <button onClick={openMenu}>
        <img src={user.user_img_url} alt="Profile" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="profile-dropdown-menu">
            <li>
              <NavLink exact to="/drinks/new">Create a Drink</NavLink>
            </li>
            <li>
              <NavLink exact to="/my-drinks">Manage Drinks</NavLink>
            </li>
            <li>
              <NavLink exact to="/my-profile">My Profile</NavLink>
            </li>
            {/* <li>
              <NavLink exact to="/edit-profile">Edit Profile</NavLink>
            </li> */}
            <li>
              <NavLink exact to="/friends">Friends</NavLink>
            </li>
            <li>
              <NavLink exact to="/logout" onClick={handleLogout}>Log Out</NavLink>
            </li>
          </div>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
