import { Link } from "react-router-dom";
import "./Drinks.css";

const DrinkTile = ({drink}) => {
    return (
        <>
            <div>
                <Link to={`/drinks/${drink.id}`}>
                    <img key={drink.id} src={`${drink?.drink_img_url}`} alt={drink.description} title={drink.name} />
                </Link>
                <div>
                    <div>Name: {drink.name}</div>
                    <div>ABV: {drink.abv}</div>
                    <div>IBU: {drink.ibu}</div>
                    <div>Description: {drink.description}</div>
                </div>
            </div>
        </>
    )
};

export default DrinkTile;
