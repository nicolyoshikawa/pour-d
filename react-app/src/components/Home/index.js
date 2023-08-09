import "./Home.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Review from "../Review";
import { loadAllReviews } from "../../store/reviews";

export default function Home() {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews))

    useEffect(() => {
        dispatch(loadAllReviews())
    }, [dispatch])

    return (
        <div className="container">
            <div className="user-feeed">
                {reviews?.map((review) => {
                    return <Review key={review.id} review={review}/>
                })}
            </div>
        </div>
    )
}