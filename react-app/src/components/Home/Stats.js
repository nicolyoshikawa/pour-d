import default_avatar from "../../assets/default_avatar.png"

export default function Stats({user, numDrinks, numReviews, numFriends}) {
    // If no user_img, show default avatar
    let avatar
    if (!user?.user_img_url) {
        avatar = default_avatar
    } else {
        avatar = user?.user_img_url
    }

    const lowercase = user?.username.toLowerCase()

    return (
        <>
            <h2 className="stats-name">
                {user?.first_name} {user?.last_name}
            </h2>
            <p className="stats-username">
                <i class="fa-solid fa-user" style={{fontSize: "8pt", color: "gray", marginRight: "5px"}}></i> {lowercase}
            </p>
            <div className="stats-grid">
                <div className="stats-grid-item">
                    {numDrinks}
                    <div className="stats-type">DRINKS</div>
                </div>
                <div className="stats-grid-item">
                    {numReviews}
                    <div className="stats-type">REVIEWS</div>
                </div>
                <div className="stats-grid-item">
                    {numFriends}
                    <div className="stats-type">FRIENDS</div>
                </div>
            </div>
        </>
    )
}