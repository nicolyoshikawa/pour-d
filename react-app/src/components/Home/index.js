import "./Home.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Review from "../Review";
import Stats from "./Stats";
import { loadAllReviews } from "../../store/reviews";
import { loadAllDrinks } from "../../store/drinks";
import * as userActions from "../../store/currUser"

export default function Home() {
    const dispatch = useDispatch()
    const reviews = useSelector(state => Object.values(state.reviews))
    const drinks = useSelector(state => state.drinks)

    // Current user stats data
    const sessionUser = useSelector(state => state.session.user)
    const userDrinks = useSelector(state => state.currUser.drinks)
    const userFriends = useSelector(state => state.currUser.friends)
    const userReviews = useSelector(state => state.currUser.reviews)

    useEffect(() => {
        dispatch(loadAllReviews())
        dispatch(loadAllDrinks())
        dispatch(userActions.getUserDrinks())
        dispatch(userActions.getUserFriends())
        dispatch(userActions.getUserReviews())
    }, [dispatch])

    return (
        <div className="container">
            <div className="sections">
                <div className="user-feed">
                    <h2>Latest reviews</h2>
                    {reviews?.map((review) => {
                        return <Review key={review.id} review={review} drink={drinks[review.drink_id]} user={review.User}/>
                    })}
                </div>
                <div className="user-stat-sidebar">
                    {sessionUser && <Stats user={sessionUser} numDrinks={userDrinks?.length} numReviews={userReviews?.length} numFriends={userFriends?.length}/>}
                </div>
            </div>
        </div>
    )
}