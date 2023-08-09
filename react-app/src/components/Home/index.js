import "./Home.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Review from "../Review";
import { loadAllReviews } from "../../store/reviews";

export default function Home() {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(loadAllReviews())
    }, [dispatch])

    const reviewArr = []
    Object.values(reviews).forEach((review) => reviewArr.push(review))

    return (
        <div className="container">
            <div className="user-feeed">
                {reviewArr?.map((review) => {
                    return <Review key={review.id} review={review} userId={review.user_id}/>
                })}
            </div>
        </div>
    )
}