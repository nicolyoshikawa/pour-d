import "./Review.css"
import { useEffect, useState } from "react";
import OpenModalButton from "../OpenModalButton";
import { NavLink } from  "react-router-dom";
import DeleteReview from "../DeleteReview";
import EditReview from "../EditReview";
import { loadDrinkById } from "../../store/drinks"

export default function Review({review, drink, user}) {
    const {id, content, created_at, drink_id, review_img_url, stars, user_id} = review
    const star = <i className="fa-solid fa-star"></i>
    const emptyStar = <i className="fa-regular fa-star"></i>
    const [showMenu, setShowMenu] = useState(true);
    const closeMenu = () => setShowMenu(false);

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
                        <span className="review-user">{user?.first_name}</span> is drinking a <NavLink to={`/drinks/${drink?.id}`}>{drink?.name}</NavLink>:
                    </div>
                    <div className="review-content">
                        {content}
                    </div>
                    <div className="review-rating">
                        {makeRating?.map((rating, el) => {
                            if (rating === 1) {
                                return <span className="star" key={el}>{star}</span>
                            }
                            return <span className="star" key={el}>{emptyStar}</span>
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
            {showMenu && (
                <>
                    <div className="review-edit">
                        <div className="review-edit-button">
                            <OpenModalButton
                                buttonText="Edit"
                                onItemClick={closeMenu}
                                modalComponent={<EditReview drink={drink} review={review}/>}
                            />
                        </div>
                        <div className="review-edit-button">
                            <OpenModalButton
                                buttonText="Delete"
                                onItemClick={closeMenu}
                                modalComponent={<DeleteReview review={review}/>}
                            />
                        </div>
                    </div>
                </>
            )}
            </div>
    )
}
