import "./Home.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Review from "../Review";
import { loadAllReviews } from "../../store/reviews";
import { loadAllDrinks } from "../../store/drinks";

export default function Home() {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews))
    const drinks = useSelector(state => state.drinks)
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(loadAllReviews())
        dispatch(loadAllDrinks())
    }, [dispatch])

    return (
        <div className="container">
            <div className="user-feeed">
                {reviews?.map((review) => {
                    return <Review key={review.id} review={review} drink={drinks[review.drink_id]} user={review.user_id}/>
                })}
            </div>
        </div>
    )
}