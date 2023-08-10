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

    console.log(drinks)


    useEffect(() => {
        dispatch(userActions.getUserDrinks())
        dispatch(userActions.getUserFriends())
        dispatch(userActions.getUserReviews())
        dispatch(loadAllDrinks())
    }, [dispatch])


    const totalDrinks = drinks?.length
    const totalFriends = friends?.length
    const totalReviews = reviews?.length

    // Grab top user's top drinks
    let sortedReviews
    let topFive = []
    if (reviews) {
        sortedReviews = [...reviews]
        sortedReviews.sort((a,b) => b.stars - a.stars)
        sortedReviews.filter((item, index) => sortedReviews.indexOf(item) === index)
        const drinkIds = sortedReviews.map((review) => {
            return review.drink_id
        })

        function removeDuplicates(arr) {
            return [...new Set(arr)];
        }

        const removed = removeDuplicates(drinkIds)

        removed.slice(0,5).forEach((id) => topFive.push(drinks?.find((drink) => drink.id === id)))
    }


    return (
        <div className="container">
            <div className="user-hero">
                    <img src={avatar} alt="avatar" className="hero-avatar"/>
                <div className="user-info">
                    <div className="user-name">
                        <h1 className="full-name">
                            {sessionUser?.first_name} {sessionUser?.last_name}
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
            <div className="sections">
                <div className="user-feed">
                    <h2>
                        Your recent reviews
                    </h2>
                    {reviews?.map((review) => {
                        return <Review user={sessionUser} review={review} drink={allDrinks[review.drink_id]}/>
                    })}
                </div>
                <div className="user-top">
                    <h2>
                        Your top beers
                    </h2>
                    <div className="top-list">
                        {topFive.filter((drink) => {
                            if (drink !== undefined) {
                                return drink
                            }
                        }).map((beer, idx) => {
                        return (
                            <NavLink to={`/drinks/${beer.id}`}>
                                <span className="top-item">
                                <img src={beer?.drink_img_url} alt="logo" className="top-img"/>
                                <div key={idx} className="top-name">{beer?.name}</div>
                                </span>
                            </NavLink>
                        )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
