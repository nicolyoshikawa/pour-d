import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import DrinksListPage from "./components/DrinksListPage";
import DrinkDetail from "./components/DrinksListPage/DrinkDetail";
import ProfilePage from "./components/ProfilePage";
import DrinkFormPage from "./components/DrinkFormPage";
import ManageDrinks from "./components/ManageDrinks";
import UpdateDrink from "./components/ManageDrinks/UpdateDrink";
import FriendsPage from "./components/FriendsPage";
import TopDrinks from "./components/TopDrinks";
import EditProfile from "./components/EditProfile";
import PageNotFound from "./components/PageNotFound";
import AboutUs from "./components/AboutUs";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const hideNavigation =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/";

  return (
    <>
      {!hideNavigation && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/drinks/top-rated">
            <TopDrinks />
          </Route>
          <Route path="/drinks/new">
            <DrinkFormPage/>
          </Route>
          <Route exact path="/drinks/:id/edit">
            <UpdateDrink />
          </Route>
          <Route exact path="/drinks/:id">
            <DrinkDetail />
          </Route>
          <Route exact path="/drinks">
            <DrinksListPage />
          </Route>
          <Route exact path="/my-drinks">
            <ManageDrinks />
          </Route>
          <Route exact path="/friends">
            <FriendsPage />
          </Route>
          <Route exact path="/my-profile">
            <ProfilePage />
          </Route>
          <Route exact path="/edit-profile">
            <EditProfile />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/logout">
            <Redirect to="/"/>
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/about-us">
            <AboutUs />
          </Route>
          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
