import "./ProfilePage.css"
import default_avatar from "../../assets/default_avatar.jpg"
import { useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { useEffect } from "react"

export default function ProfilePage() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user) // Get current logged in user
    const {id, first_name, last_name, birthday, email, username, user_img_url} = sessionUser // Destructuring user info
    const lowercase = username.toLowerCase()
    let avatar

    if (!user_img_url) {
        avatar = default_avatar
    } else {
        avatar = user_img_url
    }

    useEffect(() => {
        // Redirect to landing page if user not logged in
        if (!sessionUser) {
            history.push("/")
        }
    }, [])

    return (
        <div className="profile-container">
            <div className="user-hero">
                    <img src={avatar} alt="avatar" className="hero-avatar"/>
                <div className="user-info">
                    <h1 className="full-name">
                        {first_name} {last_name}
                    </h1>
                    <p className="username">
                        {lowercase}
                    </p>
                </div>
            </div>
        </div>
    )
}