import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as userActions from "../../store/currUser";
import "./FriendsPage.css";

const FriendsPage = () => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.currUser.friends);
  const pendings = useSelector((state) => state.currUser.pendings);

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
        <h2>Pending Friend Requests ({pendings?.length})</h2>
        <ul className="friends-list">
          {pendings?.map((pending) => (
            <li key={pending.id}>
              <div className="friend-info">
                <img src={pending.user_img_url} alt={pending.username} className="friend-img" />
                <div className="friend-details">
                  <div className="friend-name">{pending.first_name} {pending.last_name}</div>
                  <div className="friend-username">{pending.username}</div>
                </div>
              </div>
              <div className="friend-buttons">
                <button onClick={(e) => handleAccept(e, pending.id)}>Accept</button>
                <button onClick={(e) => handleReject(e, pending.id)}>Reject</button>
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
                <img src={friend.user_img_url} alt={friend.username} className="friend-img" />
                <div className="friend-details">
                  <div className="friend-name">{friend.first_name} {friend.last_name}</div>
                  <div className="friend-username">{friend.username}</div>
                </div>
              </div>
              <button onClick={(e) => handleDelete(e, friend.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FriendsPage;