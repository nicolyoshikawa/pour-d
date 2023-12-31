const USER_DRINKS = "currUser/USER_DRINKS";
const USER_FRIENDS = "currUser/USER_FRIENDS";
const USER_PENDINGS = "currUser/USER_PENDINGS";
const USER_REVIEWS = "currUser/USER_REVIEWS";

const userDrinks = (drinks) => ({
  type: USER_DRINKS,
  drinks,
});

const userFriends = (friends) => ({
  type: USER_FRIENDS,
  friends,
});

const userPendings = (pendings) => ({
  type: USER_PENDINGS,
  pendings,
});

const userReviews = (reviews) => ({
  type: USER_REVIEWS,
  reviews,
});

export const getUserDrinks = () => async (dispatch) => {
  const res = await fetch(`/api/currentUser/drinks`, {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(userDrinks(data));
    return data;
  }
};

export const getUserFriends = () => async (dispatch) => {
  const res = await fetch("/api/currentUser/friends", {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(userFriends(data));
    return data;
  }
};

export const getUserPendings = () => async (dispatch) => {
  const res = await fetch("/api/currentUser/pending");

  if (res.ok) {
    const data = await res.json();
    dispatch(userPendings(data));
    return data;
  }
};

export const getUserReviews = () => async (dispatch) => {
  const res = await fetch("/api/currentUser/reviews", {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(userReviews(data));
    return data;
  }
};

export const acceptFriendRequest = (targetId) => async (dispatch) => {
  const res = await fetch(`/api/friend/accept/${targetId}`, {
    method: "PUT",
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(getUserFriends());
    dispatch(getUserPendings());
    return data;
  }
};

export const rejectFriendRequest = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/reject/${targetId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getUserPendings());
        return data;
    }
};

export const deleteFriend = (targetId) => async (dispatch) => {
    const res = await fetch(`/api/friend/remove/${targetId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(getUserFriends());
        return data;
    }
};

const initialState = {};
export default function reducer(state = initialState, action) {
  let newState = { ...state };
  switch (action.type) {
    case USER_DRINKS:
      newState = { ...state, drinks: action.drinks };
      return newState;
    case USER_FRIENDS:
      newState = { ...state, friends: action.friends };
      return newState;
    case USER_PENDINGS:
      newState = { ...state, pendings: action.pendings };
      return newState;
    case USER_REVIEWS:
      newState = { ...state, reviews: action.reviews };
      return newState;
    default:
      return state;
  }
}
