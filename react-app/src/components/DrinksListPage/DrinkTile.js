import { Link } from "react-router-dom";
import "./Drinks.css";

const DrinkTile = ({drink, clickable}) => {
    const date = new Date(drink.created_at)
    const dateFormat = date.toLocaleDateString()
    const avgRating = drink.review_avg ? Number(drink.review_avg).toFixed(2) : "New";
    const star = <i className="fa-solid fa-star"></i>
    const emptyStar = <i className="fa-regular fa-star"></i>

    // Calculate full and empty stars to match review rating
    let makeRating = []
    for (let i = 0; i < avgRating; i++) {
        makeRating.push(1)
    }
    while (makeRating.length < 5){
        makeRating.push(0)
    }
    return (
        <div className="DrinkTile">
            <div className="drinkImg">
                <img key={drink.id} src={`${drink?.drink_img_url}`} alt={drink.description} title={drink.name} />
            </div>
            <div className="drinkInfo">
                {clickable ? (
                    <p className="drinkName"><Link to={`/drinks/${drink.id}`}> {drink.name}</Link></p>
                    ) : <p>{drink.name}</p>
                }
                <p>{drink.description}</p>
            </div>
            <div className="drinkDetails">
                <div>{drink.abv}% ABV</div>
                <div className="leftBorder">{drink.ibu} IBU</div>
                <div className="leftBorder">
                    {makeRating?.map((rating, el) => {
                        if (rating === 1) {
                            return <span key={el} className="star">{star}</span>
                        } else {
                           return <span key={el} className="star">{emptyStar}</span>
                        }
                    })} ({avgRating})
                </div>
                <div className="leftBorder">{drink.review_count} Ratings</div>
                {clickable ? (
                    <div className="leftBorder">Added {dateFormat}</div>
                    ) : <div></div>
                }
            </div>
        </div>
    )
};

export default DrinkTile;
