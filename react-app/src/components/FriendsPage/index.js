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
      <div className="friends-card">
        <h2>Pending Friend Requests ({pending.length})</h2>
        <ul className="friends-list">
          {pending?.map((request) => (
            <li key={request.id}>
              <span>{request.username} sent you a friend request.</span>
              <div>
                <button onClick={(e) => handleAccept(e, request.id)}>Accept</button>
                <button onClick={(e) => handleReject(e, request.id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="friends-card">
        <h2>Current Friends ({friends.length})</h2>
        <ul className="friends-list">
          {friends?.map((friend) => (
            <li key={friend.id}>
              <span>{friend.username}</span>
              <button onClick={(e) => handleDelete(e, friend.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;
