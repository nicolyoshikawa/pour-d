import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import BeerTile from './BeerTile';
import * as drinkActions from "../../store/drinks";
import './Beer.css';

function AllBeer(){
    const dispatch = useDispatch();
    const allDrinks = useSelector(state => Object.values(state.drinks));

    useEffect(()=> {
        dispatch(drinkActions.loadAllDrinks());
    },[dispatch]);

    return(
        <>
            <div>
                {allDrinks.map(el => (<BeerTile key={el.id} drink={el}/>))}
            </div>
        </>
    )
}

export default AllBeer;
