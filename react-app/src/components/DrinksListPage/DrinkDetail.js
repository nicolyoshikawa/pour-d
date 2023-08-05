import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import DrinkTile from './DrinkTile';
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
                <div className="drinkDetailPage">
                    <DrinkTile drink={drink} clickable={false}/>
                    <Reviews/>
                </div>
            )}
        </>
    )
};

export default DrinkDetail;
