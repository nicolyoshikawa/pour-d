import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from 'react-router-dom';
import BeerTile from './BeerTile';
import * as drinkActions from "../../store/drinks";
import './Beer.css';

const BeerDetail = () => {
    const { beerId } = useParams();
    const drinksObj = useSelector(state => state.drinks);
    const [isLoaded, setIsLoaded] = useState(false);
    const drink = drinksObj[beerId];
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(drinkActions.loadDrinkById(beerId))
        .then(()=>setIsLoaded(true))
    },[dispatch, beerId]);
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

export default BeerDetail;
