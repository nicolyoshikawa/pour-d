import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import DrinkTile from './DrinkTile';
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
                <div>
                    Drink Detail
                </div>
            )}
        </>
    )
};

export default DrinkDetail;
