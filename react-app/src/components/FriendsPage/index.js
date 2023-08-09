import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

import * as userActions from "../../store/currUser"
import "./FriendsPage.css"

const FriendsPage = () => {
    const dispatch = useDispatch();
    const friends = useSelector(state => state.currUser.friends)

    useEffect(() => {
        dispatch(userActions.getUserFriends())
    }, [dispatch])
    

  return (
    <div>
      Friends page here
    </div>
  )
};

export default FriendsPage;
