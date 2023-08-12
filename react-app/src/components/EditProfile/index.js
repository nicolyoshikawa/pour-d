import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "./EditProfile.css";

const EditProfile = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  // Redirect to landing page if user not logged in
  if (!sessionUser) {
    history.push("/");
  }

  return <div className="edit-profile-container">Edit Profile coming soon!</div>;
};

export default EditProfile;
