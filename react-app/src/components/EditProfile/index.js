import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import "./EditProfile.css";

const EditProfile = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // Redirect to landing page if user not logged in
  if (!sessionUser) {
    history.push("/");
  }
  return (
    <div className="editprofile-container">
      <div className="friends-card">
        <h1>Edit Profile coming soon!</h1>
        <p>
          Go back <NavLink to="/home">home</NavLink>
        </p>
      </div>
    </div>
  );
};

export default EditProfile;
