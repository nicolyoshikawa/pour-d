import "./Home.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";
import Review from "../Review";
import { loadAllReviews } from "../../store/reviews";

export default function Home() {
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.reviews)

    useEffect(() => {
        dispatch(loadAllReviews())
    }, [dispatch])

    return (
        <div className="container">
            <div className="user-feeed">
                {/* <Review user={user} /> */}
            </div>
        </div>
    )
}