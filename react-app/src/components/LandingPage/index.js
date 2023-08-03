import "./LandingPage.css"
import logo_white from "../../assets/logo_white.png"
import app_example from "../../assets/app_example.png"
import { NavLink, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../store/session"
import SearchBar from "./SearchBar"
import { useEffect } from "react"

export default function LandingPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user) // Check if user is logged in
    
    // Function for logging in demo user
    const demoLogin = () => {
        history.push("/home")
        return dispatch(login("demo@aa.io", "password"))
    }
    
    // Redirect to homepage if user is logged in
    useEffect(() => {
        if (sessionUser) {
            history.push("/home")
        }

        return history.push("/")
    }, [])

    return (
        <>
            <div className="hero">
                <div className="landing-btns">
                    <div className="login-signup">
                        <NavLink to="/login">
                            <button>
                                LOG IN
                            </button>
                        </NavLink>
                        <NavLink to="/signup">
                            <button>
                                CREATE AN ACCOUNT
                            </button>
                        </NavLink>
                        <button onClick={demoLogin}>
                            DEMO LOGIN
                        </button>
                    </div>
                </div>
                <div className="hero-content">
                    <img src={logo_white} alt="logo"/>
                    <p className="slogan">
                        DRINK SOCIALLY
                    </p>
                    <p className="divider">
                        --------
                    </p>
                    <h1 className="hero-text">
                        Discover and share your favorite beer.
                    </h1>
                </div>
                <div className="app-example">
                    <img src={app_example} alt="phone-img"/>
                </div>
            </div>
            <SearchBar/>
            <div className="features">
                <div className="feature">
                    <h2 className="feature-title">
                        Find new beers
                    </h2>
                    <p className="feature-body">
                        Discover your new favorite brew with our beer feed
                    </p>
                </div>
                <div className="feature">
                    <h2 className="feature-title">
                        Share your thoughts
                    </h2>
                    <p className="feature-body">
                        Leave reviews and ratings about what you're drinking, and keep track of what you loved or didn't
                    </p>
                </div>
                <div className="feature">
                    <h2 className="feature-title">
                        Connect with friends
                    </h2>
                    <p className="feature-body">
                        See what other beer lovers are drinking, and view their feedback
                    </p>
                </div>
            </div>
            <div className="landing-footer">
                <div className="footer-content">
                    Start discovering and sharing now
                    <NavLink to="/signup">
                        <button>
                            Join Pour'd
                        </button>
                    </NavLink>
                </div>
            </div>
        </>
    )
}