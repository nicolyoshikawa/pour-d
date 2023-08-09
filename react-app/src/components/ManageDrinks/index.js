import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, NavLink, Link } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import * as userActions from "../../store/currUser";
import DeleteDrink from "./DeleteDrink";
import '../DrinksListPage/Drinks.css';
import "../ProfilePage/ProfilePage.css";

function ManageDrinks() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const sessionUser = useSelector(state => state.session.user) // Get current logged in user
    // Redirect to landing page if user not logged in
    if (!sessionUser) {
        history.push("/")
    }

    const drinks = useSelector(state => state.currUser.drinks)
    useEffect(() => {
        dispatch(userActions.getUserDrinks())
        .then(()=>setIsLoaded(true));
    }, [dispatch]);

    const updateClickHandler = (drink) => {
        history.push(`/drinks/${drink.id}/edit`);
    }

    const closeMenu = () => setShowMenu(false);

    return (
        <>
            {isLoaded && (
                <>
                    <h1>Manage Drinks</h1>
                    <div className="allDrinks">
                        {drinks.length > 0 ? (
                            drinks.map(el => {
                                return (
                                    <div key={`drink_tile_${el.id}`} id={`drink_tile_${el.id}`} className="DrinkTile">
                                        <div className="drinkImg">
                                            {el.drink_img_url ?
                                            <img src={`${el.drink_img_url}`} alt={el.description} title={el.name} />
                                                :
                                            <img
                                                src={"https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"}
                                                alt={"noImage"}
                                            />}
                                        </div>
                                        <div className="drinkInfo">
                                            <p className="drinkName"><Link to={`/drinks/${el.id}`}> {el.name}</Link></p>
                                            <p>{el.description}</p>
                                        </div>
                                        <div className="drinkDetails">
                                            <div>{el.abv}% ABV</div>
                                            <div className="leftBorder">{el.ibu} IBU</div>
                                            <button onClick={()=>updateClickHandler(el)} >Edit</button>
                                            <OpenModalButton
                                                buttonText="Delete"
                                                onItemClick={closeMenu}
                                                modalComponent={<DeleteDrink drink={el}/>}
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <NavLink exact to="/drinks/new">Create A Drink</NavLink>
                        )}
                    </div>
                </>
            )}
        </>
    )
}

export default ManageDrinks;
