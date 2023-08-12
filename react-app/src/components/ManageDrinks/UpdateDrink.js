import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import * as drinkActions from "../../store/drinks";

function UpdateDrink() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const user = useSelector(state => state.session.user);
  const drinkObj = useSelector(state => state.drinks);

  const [name, setName] = useState("");
  const [abv, setAbv] = useState("");
  const [ibu, setIbu] = useState("");
  const [description, setDescription] = useState("");
  const [drink_img_url, setDrink_img_url] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [disableButton, setDisableButton] = useState(true);

  if (!user) {
    history.push("/")
  }

  let drink;

  useEffect(()=> {
    dispatch(drinkActions.loadDrinkById(id))
    .then((drinkObj)=>{
      if(drinkObj){
        setName(drinkObj.name);
        setAbv(drinkObj.abv);
        setIbu(drinkObj.ibu);
        setDescription(drinkObj.description)
        setDrink_img_url(drinkObj.drink_img_url)
      }
    })
  },[dispatch, id, drink?.name, drink?.abv, drink?.ibu, drink?.description, drink?.drink_img_url]);

  drink = drinkObj[id];

  useEffect(() => {
    const errors = [];
    if(user?.id !== drink?.user_id) errors.push("You do not have access to edit this drink.");
    if(name && name.length > 50) errors.push("Drink name needs to be under 50 characters");
    if(abv && (abv > 100 || abv < 1)) errors.push("ABV needs to be between 1 and 100");
    if(ibu && (ibu > 130 || ibu < 1)) errors.push("IBU needs to be between 1 and 130");
    if(description && description.length > 255) errors.push("Description needs to be less than 255 characters");
    if(drink_img_url && (!drink_img_url.endsWith(".png") &&
        !drink_img_url.endsWith(".jpg") && !drink_img_url.endsWith(".jpeg"))) {
        errors.push("Image URL must end in .png, .jpg, or .jpeg");
    }
    if(drink_img_url && drink_img_url.length > 255) {
        errors.push("Image URL needs to be under 255 characters");
    }
    setErrors(errors);
  }, [name, abv, ibu, description, drink_img_url, hasSubmitted, user?.id, drink?.user_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const updatedDrink = {name, abv, ibu, description, drink_img_url, id};
    if(Object.values(errors).length === 0){
        setErrors([]);
        const drink = await dispatch(drinkActions.updateADrink(updatedDrink));
        if(drink.errors){
          const errors = [];
          errors.push(drink.errors);
          setErrors(errors);
          setDisableButton(true)
        } else {
          setDisableButton(false)
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
      {drink ? (
        <div className="login-form-container">
          <div className="login-form-logo-slogan">
            <a href="/">
              <img src={logo} alt="Logo" />
              <p>DRINK SOCIALLY</p>
            </a>
          </div>
          {errors.length > 0 && (
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
            <button type="submit" className="login-button" disabled={disableButton}>UPDATE DRINK</button>
          </form>
        </div>
      ) : (
        <div>
          <div className="delete-button">Drink Could Not Be Found - <NavLink exact to="/drinks/new">Create A Drink</NavLink></div>
        </div>
      )}
    </div>
  );
}

export default UpdateDrink;
