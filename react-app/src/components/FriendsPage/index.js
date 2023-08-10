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

  const handleAccept = (targetId) => {};

  const handleReject = (targetId) => {};

  const handleDelete = (targetId) => {};

  return (
    <>
      <div className="pending-friends">
        <h2>Pending Friend Requests</h2>
        <ul>
          {pending?.map((request) => (
            <li key={request.id}>
              {request.username} sent you a friend request.
              <button onClick={() => handleAccept(request.id)}>Accept</button>
              <button onClick={() => handleReject(request.id)}>Reject</button>
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
              <button onClick={() => handleDelete(friend.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default FriendsPage;
