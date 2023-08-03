import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import DrinkTile from './DrinkTile';
import * as drinkActions from "../../store/drinks";
import './Drinks.css';

function AllDrinks(){
    const dispatch = useDispatch();
    const allDrinks = useSelector(state => Object.values(state.drinks));

    useEffect(()=> {
        dispatch(drinkActions.loadAllDrinks());
    },[dispatch]);

    return(
        <>
            <div>
                {allDrinks.map(el => (<DrinkTile key={el.id} drink={el}/>))}
            </div>
        </>
    )
}

export default AllDrinks;
