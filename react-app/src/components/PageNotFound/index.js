import React from "react";
import { NavLink } from "react-router-dom";

import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="pagenotfound-container">
      <div className="friends-card">
        <h1>Page not found :(</h1>
        <p>
          Go back <NavLink to="/home">home</NavLink>
        </p>
      </div>
    </div>
  );
};

export default PageNotFound;
