import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DrinkTile from './DrinkTile';
import * as drinkActions from "../../store/drinks";
import './Drinks.css';

function AllDrinks(){
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const allDrinks = useSelector(state => Object.values(state.drinks));

    useEffect(()=> {
        dispatch(drinkActions.loadAllDrinks())
        .then(()=>setIsLoaded(true))
    },[dispatch]);

    return(
        <>
            {isLoaded && (
                <div className="allDrinks container">
                        <div className="top-feed">
                            {allDrinks.map(el => (<DrinkTile key={el.id} drink={el} clickable={true}/>))}
                        </div>
                </div>
            )}
        </>
    )
}

export default AllDrinks;
