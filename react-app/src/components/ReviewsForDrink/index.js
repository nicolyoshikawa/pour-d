import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import ReviewTile from "./ReviewTile";

const ReviewsForDrink = ({drink}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const allReviews = useSelector(state => Object.values(state.reviews));
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(reviewActions.loadReviewsByDrinkId(drink))
        .then(()=>setIsLoaded(true))
    },[dispatch]);
    return (
        <>
            {isLoaded && (
                <div>
                    {allReviews.map(el => (<ReviewTile key={el.id} review={el} drink={drink}/>))}
                </div>
            )}
        </>
    )
};

export default ReviewsForDrink;
