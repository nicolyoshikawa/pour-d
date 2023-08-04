import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
// import DrinkTile from './DrinkTile';
import Reviews from "../Reviews";
import * as drinkActions from "../../store/drinks";
import './Drinks.css';

const DrinkDetail = () => {
    const { id } = useParams();
    const drinksObj = useSelector(state => state.drinks);
    const [isLoaded, setIsLoaded] = useState(false);
    const drink = drinksObj[id];
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(drinkActions.loadDrinkById(id))
        .then(()=>setIsLoaded(true))
    },[dispatch, id]);
    return (
        <>
            {isLoaded && (
                <>
                    <div>
                        <img key={drink.id} src={`${drink?.drink_img_url}`} alt={drink.description} title={drink.name} />
                    </div>
                    <div>Name: {drink.name}</div>
                    <div>ABV: {drink.abv}</div>
                    <div>IBU: {drink.ibu}</div>
                    <div>Description: {drink.description}</div>
                    <Reviews/>
                </>
            )}
        </>
    )
};

export default DrinkDetail;
