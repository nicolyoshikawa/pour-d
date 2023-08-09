import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from "../../store/reviews";
import ReviewTile from "./ReviewTile";
import ReviewModal from "../ReviewFormPage/ReviewModal";

const ReviewsForDrink = ({drink}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const allReviews = useSelector(state => Object.values(state.reviews));
    const user = useSelector(state => state.session.user);
    let userHasReviewOnDrink = false;
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(reviewActions.loadReviewsByDrinkId(drink))
        .then(()=>setIsLoaded(true))
    },[dispatch, drink]);

    const userReviews = allReviews.filter((review) => {
        return (review.user_id === user?.id);
    });

    userHasReviewOnDrink = (userReviews.length > 0) ? true : false;

    let reviewPage;
    if(user && allReviews.length === 0 && user.id !== drink.user_id){
        reviewPage = (
            <>
                <div>Be the first to review!</div>
                <ReviewModal user={user} drink={drink}/>
            </>
        )
    } else if(user && user.id !== drink.user_id && (!userHasReviewOnDrink)){
        reviewPage = (
            <>
                <ReviewModal user={user} drink={drink}/>
                {allReviews.map(el => (<ReviewTile key={el.id} review={el} drink={drink}/>))}
            </>
        );
    } else {
        reviewPage = (
            <>
                {allReviews.map(el => (<ReviewTile key={el.id} review={el} drink={drink}/>))}
            </>
        )
    }

    return (
        <>
            {isLoaded && (
                <>
                    <div>
                        {reviewPage}
                    </div>
                </>
            )}
        </>
    )
};

export default ReviewsForDrink;
