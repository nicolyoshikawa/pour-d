import "./Review.css"
import { loadDrinkById } from "../../store/drinks"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"

export default function Review({user, review}) {
    const dispatch = useDispatch()
    const {id, content, created_at, drink_id, review_img_url, stars, user_id} = review
    const drinks = useSelector(state => state.drinks)
    const drink = drinks[drink_id]
    const star = <i class="fa-solid fa-star"></i>
    const emptyStar = <i class="fa-regular fa-star"></i>


    useEffect(() => {
        dispatch(loadDrinkById(drink_id))
    }, [dispatch])

    // Calculate full and empty stars to match review rating
    let makeRating = []
    for (let i = 0; i < stars; i++) {
        makeRating.push(1)
    }
    if (makeRating.length < 5) {
        // const empty = stars % 5
        const empty = 5 - makeRating.length
        for (let i = 0; i < empty; i++) {
            makeRating.push(0)
        }
    }

    // Change date format
    const date = new Date(created_at)
    const formatDate = date.toLocaleDateString()

    return (
        <div className="review">
            <div className="review-beer">
                {user?.first_name} is drinking a {drink?.name}
            </div>
            <div className="review-content">
                {content}
            </div>
            <div className="review-rating">
                {makeRating?.map((rating) => {
                    if (rating === 1) {
                        return <span className="star">{star}</span>
                    }
                    return <span className="star">{emptyStar}</span>
                })}
            </div>
            <div className="date">
                {formatDate}
            </div>
            <div className="beer-img">
                <img src={drink?.drink_img_url} alt="logo"/>
            </div>
            <div className="review-img">
                <img src={review_img_url} alt="review-img"/>
            </div>
        </div>
    )
}
