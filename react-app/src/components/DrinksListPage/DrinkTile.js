import { Link } from "react-router-dom";
import "./Drinks.css";

const DrinkTile = ({drink, clickable}) => {
    return (
        <div className="DrinkTile">
            <div>
                <img key={drink.id} src={`${drink?.drink_img_url}`} alt={drink.description} title={drink.name} />
            </div>
            {clickable ? (
                <div><Link to={`/drinks/${drink.id}`}> {drink.name}</Link></div>
                ) : <div>{drink.name}</div>
            }
            <div>{drink.description}</div>
            <div className="drinkDetails">
                <div>{drink.abv}% ABV</div>
                <div className="leftBorder">{drink.ibu} IBU</div>
                <div className="leftBorder">stars</div>
                <div className="leftBorder">number of ratings</div>
                {clickable ? (
                    <div className="leftBorder">Added {drink.created_at}</div>
                    ) : <div></div>
                }
            </div>
        </div>
    )
};

export default DrinkTile;
