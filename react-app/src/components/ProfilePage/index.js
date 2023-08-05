import "./ProfilePage.css"
import default_avatar from "../../assets/default_avatar.png"
import { getUserDrinks, getUserFriends } from "../../store/currUser"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"

export default function ProfilePage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user) // Get current logged in user
    const {id, first_name, last_name, birthday, email, username, user_img_url} = sessionUser // Destructuring user info
    const lowercase = username?.toLowerCase()

    const drinks = useSelector(state => state.currUser.drinks)
    const friends = useSelector(state => state.currUser.friends)

    // If no user_img, show default avatar
    let avatar
    if (!user_img_url) {
        avatar = default_avatar
    } else {
        avatar = user_img_url
    }

    useEffect(() => {
        // Redirect to landing page if user not logged in
        if (!sessionUser) {
            history.push("/")
        }

        dispatch(getUserDrinks())
        dispatch(getUserFriends())
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
                                DRINKS
                            </h3>
                            <p className="stat-body">
                                {totalDrinks}
                            </p>
                        </div>
                        <div className="stat">
                            <h3 className="stat-title">
                                FRIENDS
                            </h3>
                            <p className="stat-body">
                                {totalFriends}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}