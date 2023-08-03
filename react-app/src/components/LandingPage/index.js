import "./LandingPage.css"
import logo_white from "../../assets/logo_white.png"
import app_example from "../../assets/app_example.png"
import { NavLink } from "react-router-dom"

export default function LandingPage() {
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
                    <NavLink to="/signup">
                        <button>
                            DEMO LOGIN
                        </button>
                    </NavLink>
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