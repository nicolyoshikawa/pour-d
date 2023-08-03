import { Link } from "react-router-dom";
import "./Beer.css";

const BeerTile = ({drink}) => {
    return (
        <>
            <div>
                <Link to={`/beer/${drink.id}`}>
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

export default BeerTile;
