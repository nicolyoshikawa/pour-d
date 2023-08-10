import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as userActions from "../../store/currUser";
import * as reviewActions from "../../store/reviews";


function DeleteReview({review}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(true);
  const { closeModal } = useModal();
  const sessionUser = useSelector(state => state.session.user) // Get current logged in user
  // // Redirect to landing page if user not logged in
  if (!sessionUser) {
      history.push("/")
  }

  const reviewId = review.id

  useEffect(() => {
    const errors = [];
    if(sessionUser?.id !== review?.user_id) errors.push("You do not have access to delete this review.");
    setErrors(errors);
  }, [sessionUser?.id, review?.user_id]);

  const deleteClickHandler = async () => {
    const reviewDeleted = await dispatch(reviewActions.deleteReview(reviewId))
    .catch(async (res) => {
        const data = await res.json();
          if (data && data.message) {
              setErrors(data.message);
          };
    });

    if (reviewDeleted) {
        // history.push("/my-profile");
        dispatch(userActions.getUserReviews())
        closeModal()
    };
  }

  const keepClickHandler = () => {
    setShowModal(false);
    closeModal()
  }
    return (
      <>
        {showModal && (
          <div className="login-form-container">
            <h2>Confirm Delete</h2>
            {errors.length > 0 && <p className="login-form-container-errors">{errors}</p>}
            <div className="delete-button question">Are you sure you want to delete this review?</div>
            <button onClick={deleteClickHandler} className="delete-button">Yes</button>
            <button onClick={keepClickHandler} className="delete-button">No</button>
          </div>
        )}
      </>
    );
}
export default DeleteReview;
