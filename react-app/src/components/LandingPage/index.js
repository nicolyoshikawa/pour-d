import "./LandingPage.css"
import logo_white from "../../assets/logo_white.png"
import app_example from "../../assets/app_example.png"
import { NavLink, useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import SearchBar from "./SearchBar"

export default function LandingPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const demoLogin = () => {
        history.push("/home")
        return dispatch(login("demo@aa.io", "password"))
    }

    return (
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
    )
}