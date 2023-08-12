import "./ProfilePage.css"
import default_avatar from "../../assets/default_avatar.png"
import * as userActions from "../../store/currUser"
import { useSelector, useDispatch } from "react-redux"
import { useHistory, NavLink } from "react-router-dom"
import { useEffect } from "react"
import Review from "../Review"
import { loadAllDrinks } from "../../store/drinks"

export default function ProfilePage() {
    const history = useHistory()
    const dispatch = useDispatch()

    const sessionUser = useSelector(state => state.session.user) // Get current logged in user
    // Redirect to landing page if user not logged in
    if (!sessionUser) {
        history.push("/")
    }

    const lowercase = sessionUser?.username?.toLowerCase()

    // If no user_img, show default avatar
    let avatar
    if (!sessionUser?.user_img_url) {
        avatar = default_avatar
    } else {
        avatar = sessionUser?.user_img_url
    }

    const drinks = useSelector(state => state.currUser.drinks)
    const friends = useSelector(state => state.currUser.friends)
    const reviews = useSelector(state => state.currUser.reviews)
    const allDrinks = useSelector(state => state.drinks)

    useEffect(() => {
        dispatch(userActions.getUserDrinks())
        dispatch(userActions.getUserFriends())
        dispatch(userActions.getUserReviews())
        dispatch(loadAllDrinks())
    }, [dispatch])

    reviews?.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))

    const totalDrinks = drinks?.length
    const totalFriends = friends?.length
    const totalReviews = reviews?.length

    let sortedReviews
    let sortedTop
    if (reviews) {
        sortedReviews = [...reviews]?.sort((a,b) => b.stars - a.stars)
        sortedTop = sortedReviews.map((review) => {
            if(drinks &&  allDrinks[review.drink_id]){
                return allDrinks[review.drink_id]
            }
        })
    }

    return (
        <>
            <div className="user-hero">
                    <img src={avatar} alt="avatar" className="hero-avatar"/>
                <div className="user-info">
                    <div className="user-name">
                        <h1 className="full-name">
                            {sessionUser?.first_name} {sessionUser?.last_name}
                        </h1>
                        <p className="username">
                        <i className="fa-solid fa-user" style={{fontSize: "10pt", color: "white", marginRight: "10px"}}></i>{lowercase}
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
                                <span className="number">{totalReviews}</span> REVIEWS
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
        <div className="container">
            <div className="sections">
                <div className="user-feed">
                    <h2>
                        Your recent reviews
                    </h2>
                    {reviews?.map((review) => {
                        return <Review user={sessionUser} review={review} drink={allDrinks[review?.drink_id]}/>
                    })}
                </div>
                <div className="user-top">
                    <h2>
                        Your top drinks
                    </h2>
                    <div className="top-list">
                        {reviews && drinks && sortedTop?.slice(0,5).map((beer, idx) => {
                            if (beer !== undefined) {
                            return (
                                <NavLink to={`/drinks/${beer?.id}`}>
                                <span className="top-item">
                                <img src={beer?.drink_img_url} alt="logo" className="top-img"/>
                                <div key={idx} className="top-name">{beer?.name}</div>
                                </span>
                            </NavLink>
                        )}
                        })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
