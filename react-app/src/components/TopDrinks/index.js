import "./TopDrinks.css"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import * as userActions from "../../store/currUser"
import { loadAllDrinks } from "../../store/drinks"
import Stats from "../Home/Stats"
import DrinkTile from "../DrinksListPage/DrinkTile"

export default function TopDrinks() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const userDrinks = useSelector(state => state.currUser.drinks)
    const userFriends = useSelector(state => state.currUser.friends)
    const userReviews = useSelector(state => state.currUser.reviews)
    const drinks = useSelector(state => Object.values(state.drinks))
    console.log(sessionUser)

    useEffect(() => {
        dispatch(loadAllDrinks())
        dispatch(userActions.getUserDrinks())
        dispatch(userActions.getUserFriends())
        dispatch(userActions.getUserReviews())
    }, [dispatch])

    const sorted = drinks?.sort((a,b) => Number(b.review_avg) - Number(a.review_avg))

    return (
        <div className="container">
            <div className="sections">
                <div className="top-feed-full">
                    <h2>
                        Top 25 drinks
                    </h2>
                    {sorted?.slice(0,25).map(el => (<DrinkTile key={el.id} drink={el} clickable={true}/>))}
                </div>
            </div>
        </div>
    )
}
