import { Link } from "react-router-dom";
import "./Drinks.css";

const DrinkTile = ({drink}) => {
    return (
        <>
            <div>
                <img key={drink.id} src={`${drink?.drink_img_url}`} alt={drink.description} title={drink.name} />
            </div>
            <div><Link to={`/drinks/${drink.id}`}> {drink.name}</Link></div>
            <div>ABV: {drink.abv}</div>
            <div>IBU: {drink.ibu}</div>
            <div>Description: {drink.description}</div>
        </>
    )
};

export default DrinkTile;
