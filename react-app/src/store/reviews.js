
const LOAD_REVIEWS = "reviews/LOAD_REVIEWS";
const REVIEW_BY_ID = "reviews/REVIEW_BY_ID";
const REVIEWS_BY_DRINKID = "drinks/REVIEWS_BY_DRINKID";
const CREATE_A_REVIEW = "reviews/CREATE_A_REVIEW";
const UPDATE_A_REVIEW = "reviews/UPDATE_A_REVIEW";
const DELETE_A_REVIEW = "reviews/DELETE_A_REVIEW";

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

export const reviewById = (review) => ({
  type: REVIEW_BY_ID,
  review
});

export const reviewsByDrinkId = (reviews) => ({
  type: REVIEWS_BY_DRINKID,
  reviews
});

export const createAReview = (review) => ({
  type: CREATE_A_REVIEW,
  review
});

export const editAReview = (review) => ({
  type: UPDATE_A_REVIEW,
  review,
});

export const deleteAReview = (reviewId) => ({
  type: DELETE_A_REVIEW,
  reviewId
});

export const loadAllReviews = () => async (dispatch) => {
  const response = await fetch("/api/reviews", {
    method: "GET"
  });
  const data = await response.json();
  dispatch(loadReviews(data.reviews));
  return response;
};

export const loadReviewById = (id) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${id}`, {
    method: "GET"
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(reviewById(res));
    return res;
  }
};

export const loadReviewsByDrinkId = (drink) => async (dispatch) => {
  const response = await fetch(`/api/drinks/${drink.id}/reviews`, {
    method: "GET"
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(reviewsByDrinkId(data.reviews));
    return response;
  }
};

export const createNewReview = (review) => async (dispatch) => {
  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const newReview = await response.json();
    dispatch(createAReview(newReview));
    return newReview;
  }
};

export const updateAReview = (review) => async dispatch => {
  const response = await fetch(`/api/reviews/${review.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });

  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(editAReview(updatedReview));
    return updatedReview;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    const res = await response.json();
    dispatch(deleteAReview(reviewId));
    return res;
  }
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case LOAD_REVIEWS:
        action.reviews.forEach((review) => {
            newState[review.id] = review;
        });
        return newState;
    case REVIEW_BY_ID:
      newState[action.review.id] = action.review;
      return newState;
    case REVIEWS_BY_DRINKID:
        action.reviews.forEach((review) => {
            newState[review.id] = review;
        });
        return newState;
    case CREATE_A_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case UPDATE_A_REVIEW:
      newState[action.review.id] = action.review;
      return newState;
    case DELETE_A_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return newState;
  }
};

export default reviewsReducer;
