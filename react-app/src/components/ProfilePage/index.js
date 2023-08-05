import "./ProfilePage.css"
import default_avatar from "../../assets/default_avatar.png"
import * as userActions from "../../store/currUser"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import Review from "../Review"

export default function ProfilePage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user) // Get current logged in user
    const {id, first_name, last_name, birthday, email, username, user_img_url} = sessionUser // Destructuring user info
    const lowercase = username?.toLowerCase()

    // If no user_img, show default avatar
    let avatar
    if (!user_img_url) {
        avatar = default_avatar
    } else {
        avatar = user_img_url
    }

    const drinks = useSelector(state => state.currUser.drinks)
    const friends = useSelector(state => state.currUser.friends)
    const reviews = useSelector(state => state.currUser.reviews)


    useEffect(() => {
        // Redirect to landing page if user not logged in
        if (!sessionUser) {
            history.push("/")
        }

        dispatch(userActions.getUserDrinks())
        dispatch(userActions.getUserFriends())
        dispatch(userActions.getUserReviews())
    }, [])


    const totalDrinks = drinks?.length
    const totalFriends = friends?.length
    return (
        <div className="profile-container">
            <div className="user-hero">
                    <img src={avatar} alt="avatar" className="hero-avatar"/>
                <div className="user-info">
                    <div className="user-name">
                        <h1 className="full-name">
                            {first_name} {last_name}
                        </h1>
                        <p className="username">
                            {lowercase}
                        </p>
                    </div>
                    <div className="stats">
                        <div className="stat">
                            <h3 className="stat-title">
                                <span className="number">{totalDrinks}</span> DRINKS
                            </h3>
                        </div>
                        <div className="stat">
                            <h3 className="stat-title">
                                <span className="number">{totalFriends}</span> FRIENDS
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-feed">
                <h2>Your recent activity</h2>
                {reviews?.map((review) => {
                    return <Review user={sessionUser} review={review}/>
                })}
            </div>
        </div>
    )
}