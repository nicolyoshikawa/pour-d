import "./Review.css"
import { loadAllDrinks } from "../../store/drinks"
import { loadUsers } from "../../store/users"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

export default function Review({review}) {
    const dispatch = useDispatch()
    const {id, content, created_at, drink_id, review_img_url, stars, user_id} = review
    const drinks = useSelector(state => state.drinks)
    const users = useSelector(state => state.users)
    const drink = drinks[drink_id]
    const user = users[user_id]
    const star = <i class="fa-solid fa-star"></i>
    const emptyStar = <i class="fa-regular fa-star"></i>
    

    useEffect(() => {
            dispatch(loadAllDrinks())
            dispatch(loadUsers())
    }, [dispatch])

    // Calculate full and empty stars to match review rating
    let makeRating = []
    for (let i = 0; i < stars; i++) {
        makeRating.push(1)
    }
    while (makeRating.length < 5){
        makeRating.push(0)
    }

    // Change date format
    const date = new Date(created_at)
    const formatDate = date.toLocaleDateString()

    return (
        <div className="review">
            <div className="review-info">
                <div className="review-txt">
                    <div className="review-beer">
                        <span className="review-user">{user?.first_name}</span> is drinking a <NavLink to={`/drinks/${id}`}>{drink?.name}</NavLink>:
                    </div>
                    <div className="review-content">
                        {content}
                    </div>
                    <div className="review-rating">
                        {makeRating?.map((rating, idx) => {
                            if (rating === 1) {
                                return <span className="star" key={idx}>{star}</span>
                            }
                            return <span className="star" key={idx}>{emptyStar}</span>
                        })}
                    </div>
                </div>
                <div className="beer-img">
                    <img src={drink?.drink_img_url} alt="logo"/>
                </div>
            </div>
            <div className="review-img">
                <img src={review_img_url && review_img_url} alt="review-img"/>
            </div>
            <div className="review-date">
                {formatDate}
            </div>
        </div>
    )
}