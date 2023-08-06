const ReviewTile = ({review, drink}) => {
    const star = <i className="fa-solid fa-star"></i>
    const emptyStar = <i className="fa-regular fa-star"></i>
    let makeRating = []
    for (let i = 0; i < review.stars; i++) {
        makeRating.push(1)
    }
    while (makeRating.length < 5){
        makeRating.push(0)
    }
    return (
        <>
            <div className="review">
                <div className="review-beer">
                    ___ is drinking a {drink?.name}
                </div>
                <div className="review-content">
                    {review.content}
                </div>
                <div className="review-rating">
                    {makeRating?.map((rating, el) => {
                        if (rating === 1) {
                            return <span key={el} className="star">{star}</span>
                        }
                        return <span key={el} className="star">{emptyStar}</span>
                    })}
                </div>
                <div className="review-img">
                    <img src={review.review_img_url} alt="review-img"/>
                </div>
            </div>
        </>
    )
};

export default ReviewTile;
