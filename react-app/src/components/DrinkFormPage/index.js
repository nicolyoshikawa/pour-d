import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import * as drinkActions from "../../store/drinks";

function DrinkFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");
  const [abv, setAbv] = useState("");
  const [ibu, setIbu] = useState("");
  const [description, setDescription] = useState("");
  const [drink_img_url, setDrink_img_url] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const newDrink = {name, abv, ibu, description, drink_img_url};
    if(Object.values(errors).length === 0){
        setErrors({});
        const drink = await dispatch(drinkActions.createNewDrink(newDrink))
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })
        if(drink){
            reset();
            history.push(`/drinks/${drink.id}`);
            setErrors({});
        }
    }
  };
  const reset = () => {
    setName("");
    setAbv("");
    setIbu("");
    setDescription("");
    setDrink_img_url("");
    setErrors([]);
    setHasSubmitted(false);
  };

  return (
    <div>
      <div className="login-form-container">
        <div className="login-form-logo-slogan">
          <a href="/">
            <img src={logo} alt="Logo" />
            <p>DRINK SOCIALLY</p>
          </a>
        </div>
        {hasSubmitted && errors.length > 0 && (
          <div className="login-form-container-errors">
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="login-form-input-container">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="login-form-input-container">
            <input
              type="text"
              placeholder="ABV"
              value={abv}
              onChange={(e) => setAbv(e.target.value)}
              required
            />
          </div>
          <div className="login-form-input-container">
            <input
              type="text"
              placeholder="IBU"
              value={ibu}
              onChange={(e) => setIbu(e.target.value)}
              required
            />
          </div>
          <div className="login-form-input-container">
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name='body'
                placeholder="Description"
                required
            />
          </div>
          <div className="login-form-input-container">
            <input
                type='text'
                onChange={(e) => setDrink_img_url(e.target.value)}
                value={drink_img_url}
                placeholder='Drink Image'
                name='drink_img_url'
            />
          </div>
          <button type="submit" className="login-button">CREATE DRINK</button>
        </form>
      </div>
    </div>
  );
}

export default DrinkFormPage;
