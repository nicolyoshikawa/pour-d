import { Link } from "react-router-dom";
import "./Drinks.css";

const DrinkTile = ({drink, clickable}) => {
    const date = new Date(drink.created_at)
    const dateFormat = date.toLocaleDateString()
    return (
        <div className="DrinkTile">
            <div className="drinkGrid">
                <div className="drinkImg">
                    <img key={drink.id} src={`${drink?.drink_img_url}`} alt={drink.description} title={drink.name} />
                </div>
                {clickable ? (
                    <div className="drinkName"><Link to={`/drinks/${drink.id}`}> {drink.name}</Link></div>
                    ) : <div>{drink.name}</div>
                }
                <div className="drinkDescription">{drink.description}</div>
            </div>
            <div className="drinkDetails">
                <div>{drink.abv}% ABV</div>
                <div className="leftBorder">{drink.ibu} IBU</div>
                <div className="leftBorder">stars</div>
                <div className="leftBorder">number of ratings</div>
                {clickable ? (
                    <div className="leftBorder">Added {dateFormat}</div>
                    ) : <div></div>
                }
            </div>
        </div>
    )
};

export default DrinkTile;
