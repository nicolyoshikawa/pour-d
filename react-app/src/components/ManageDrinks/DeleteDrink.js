import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as drinkActions from "../../store/drinks";
import * as userActions from "../../store/currUser";
import "./DeleteDrink.css"

function DeleteDrink({drink}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(true);
  const { closeModal } = useModal();
  const user = useSelector(state => state.session.user) // Get current logged in user
  // Redirect to landing page if user not logged in
  if (!user) {
      history.push("/")
  }

  useEffect(() => {
    const errors = [];
    if(user.id !== drink.user_id) errors.push("You do not have access to delete this drink.");
    setErrors(errors);
  }, [user.id, drink.user_id]);

  const deleteClickHandler = async () => {
    const drinkDeleted = await dispatch(drinkActions.deleteDrink(drink.id))
    .catch(async (res) => {
        const data = await res.json();
          if (data && data.message) {
              setErrors(data.message);
          };
    });

    if (drinkDeleted) {
        history.push("/my-drinks");
        dispatch(userActions.getUserDrinks())
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
            <div className="delete-button question">Are you sure you want to delete this drink?</div>
            <button onClick={deleteClickHandler} className="delete-button">Yes</button>
            <button onClick={keepClickHandler} className="delete-button">No</button>
          </div>
        )}
      </>
    );
}
export default DeleteDrink;
