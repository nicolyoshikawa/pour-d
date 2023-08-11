import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../store/currUser";
import "./FriendsPage.css";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.currUser.friends);
  const pending = useSelector((state) => state.currUser.pendings);

  useEffect(() => {
    dispatch(userActions.getUserFriends());
    dispatch(userActions.getUserPendings());
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
      <div className="pending-friends">
        <h2>Pending Friend Requests</h2>
        <ul>
          {pending?.map((request) => (
            <li key={request.id}>
              {request.username} sent you a friend request.
              <button onClick={(e) => handleAccept(e, request.id)}>Accept</button>
              <button onClick={(e) => handleReject(e, request.id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="current-friends">
        <h2>Current Friends</h2>
        <ul>
          {friends?.map((friend) => (
            <li key={friend.id}>
              {friend.username}
              <button onClick={(e) => handleDelete(e, friend.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
