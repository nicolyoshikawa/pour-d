import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import * as drinkActions from "../../store/drinks";

const ReviewsForDrink = ({drink}) => {
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
            <div> Reviews to be worked on soon </div>
        </>
    )
};

export default ReviewsForDrink;
