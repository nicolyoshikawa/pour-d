import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

export default function TopDrinks({drinks}) {
    const sorted = drinks?.sort((a,b) => Number(b.review_avg).toFixed(2) - Number(a.review_avg).toFixed(2))

    return (
        <>
            <h2 className="top-title">
                Top drinks
            </h2>
            <div className="top-list">
            {sorted.slice(0,5).map((beer, idx) => {
                return (
                    <NavLink to={`/drinks/${beer.id}`}>
                        <span className="top-item">
                            <img src={beer?.drink_img_url} alt="logo" className="top-img"/>
                            <div key={idx} className="top-name">{beer?.name}
                                <div key={`rating-${idx}`} className="top-rating">
                                    AVG: {Number(beer?.review_avg).toFixed(2)}
                                </div>
                            </div>
                        </span>
                    </NavLink>
                )
                })}
            </div>
        </>
    )
}
