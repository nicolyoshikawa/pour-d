import { NavLink } from "react-router-dom/cjs/react-router-dom.min"

export default function TopDrinks({drinks}) {
    const sorted = drinks?.sort((a,b) => b.review_avg - a.review_avg)

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
                                    AVG: {beer?.review_avg}
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