import React, { useState, useEffect } from "react";
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

  const sessionUser = useSelector(state => state.session.user) // Get current logged in user
  // Redirect to landing page if user not logged in
  if (!sessionUser) {
      history.push("/")
  }

  useEffect(() => {
    const errors = [];
    if(name && name.length > 50) errors.push("Drink name needs to be under 50 characters");
    if(abv && (abv > 100 || abv < 0)) errors.push("ABV needs to be between 0 and 100");
    if(ibu && (ibu > 130 || ibu < 0)) errors.push("IBU needs to be between 0 and 130");
    if(description && description.length > 255) errors.push("Description needs to be less than 255 characters");
    if(drink_img_url && (!drink_img_url.endsWith(".png") &&
        !drink_img_url.endsWith(".jpg") && !drink_img_url.endsWith(".jpeg"))) {
        errors.push("Image URL must end in .png, .jpg, or .jpeg");
    }
    if(drink_img_url && drink_img_url.length > 255) {
        errors.push("Image URL needs to be under 255 characters");
    }
    setErrors(errors);
  }, [name, abv, ibu, description, drink_img_url, hasSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const newDrink = {name, abv, ibu, description, drink_img_url};
    if(Object.values(errors).length === 0){
        setErrors([]);
        const drink = await dispatch(drinkActions.createNewDrink(newDrink));
        if(drink.errors){
          const errors = [];
          errors.push(drink.errors);
          setErrors(errors);
        } else {
          reset();
          history.push(`/drinks/${drink.id}`);
          setErrors([]);
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
