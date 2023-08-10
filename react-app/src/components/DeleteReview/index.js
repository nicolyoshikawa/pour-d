import React, { useState } from 'react';
import { useDispatch } from "react-redux";
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
  const reviewId = review.id

  const deleteClickHandler = async () => {
    const reviewDeleted = await dispatch(reviewActions.deleteReview(reviewId))
    .catch(async (res) => {
        const data = await res.json();
          if (data && data.message) {
              setErrors(data.message);
          };
    });

    if (reviewDeleted) {
        history.push("/my-profile");
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
