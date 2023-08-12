import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllDrinks } from "../../store/drinks";
import * as userActions from "../../store/currUser";
import Stats from "../Home/Stats";
import TopDrinks from "../Home/TopDrinks";
import "./FriendsPage.css";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const drinks = useSelector((state) => state.drinks);
  const sessionUser = useSelector((state) => state.session.user);
  const userDrinks = useSelector((state) => state.currUser.drinks);
  const friends = useSelector((state) => state.currUser.friends);
  const userReviews = useSelector((state) => state.currUser.reviews);
  const pendings = useSelector((state) => state.currUser.pendings);

  useEffect(() => {
    // dispatch(loadAllDrinks())
    dispatch(userActions.getUserDrinks());
    dispatch(userActions.getUserFriends());
    dispatch(userActions.getUserPendings());
    dispatch(userActions.getUserReviews());
  }, [dispatch]);

  const handleAccept = async (e, targetId) => {
    e.preventDefault();
    dispatch(userActions.acceptFriendRequest(targetId));
  };

  const handleReject = async (e, targetId) => {
    e.preventDefault();
    dispatch(userActions.rejectFriendRequest(targetId));
  };

  const handleDelete = async (e, targetId) => {
    e.preventDefault();
    dispatch(userActions.deleteFriend(targetId));
  };

  return (
    <div className="friends-all-container">
      <div className="friends-container">
        <div className="friends-card">
          <h2>Pending Friend Requests ({pendings?.length})</h2>
          <ul className="friends-list">
            {pendings?.map((pending) => (
              <li key={pending.id}>
                <div className="friend-info">
                  <img
                    src={pending.user_img_url}
                    alt={pending.username}
                    className="friend-img"
                  />
                  <div className="friend-details">
                    <div className="friend-name">
                      {pending.first_name} {pending.last_name}
                    </div>
                    <div className="friend-username">{pending.username}</div>
                  </div>
                </div>
                <div className="friend-buttons">
                  <button onClick={(e) => handleAccept(e, pending.id)}>
                    Accept
                  </button>
                  <button onClick={(e) => handleReject(e, pending.id)}>
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="friends-card">
          <h2>Current Friends ({friends?.length})</h2>
          <ul className="friends-list">
            {friends?.map((friend) => (
              <li key={friend.id}>
                <div className="friend-info">
                  <img
                    src={friend.user_img_url}
                    alt={friend.username}
                    className="friend-img"
                  />
                  <div className="friend-details">
                    <div className="friend-name">
                      {friend.first_name} {friend.last_name}
                    </div>
                    <div className="friend-username">{friend.username}</div>
                  </div>
                </div>
                <button onClick={(e) => handleDelete(e, friend.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="friends-sidebar-container">
        <div className="friends-card friends-stats">
          {sessionUser && (
            <Stats
              user={sessionUser}
              numDrinks={userDrinks?.length}
              numReviews={userReviews?.length}
              numFriends={friends?.length}
            />
          )}
        </div>
        <div className="friends-card friends-topdrinks">
          <TopDrinks drinks={Object.values(drinks)} />
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
