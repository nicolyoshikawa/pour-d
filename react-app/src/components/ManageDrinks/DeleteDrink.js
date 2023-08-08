import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as drinkActions from "../../store/drinks";
import * as userActions from "../../store/currUser";

function DeleteDrink({drink, closeMenu}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(true);
  const { closeModal } = useModal();

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
          <>
            <div>Confirm Delete</div>
            {errors.length > 0 && <p>{errors}</p>}
            <div>Are you sure you want to delete this drink?</div>
            <button onClick={deleteClickHandler}>Yes</button>
            <button onClick={keepClickHandler}>No</button>
          </>
        )}
      </>
    );
}
export default DeleteDrink;
