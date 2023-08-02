import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const hideNavigation = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavigation && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/beer/top-rated">
            <p>Top Beers to come</p>
          </Route>
          <Route exact path="/beer">
            <p>Beer List Page</p>
          </Route>
          <Route exact path="/friends">
            <p>Friends</p>
          </Route>
          <Route exact path="/my-profile">
            <p>My Profile</p>
          </Route>
          <Route exact path="/edit-profile">
            <p>Edit Profile</p>
          </Route>
          <Route exact path="/checkins">
            <p>Check-ins</p>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
