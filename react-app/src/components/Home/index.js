import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    const logoutUser = () => {
        history.push("/")
        return dispatch(logout())
    }
    return (
        <div>
            <button onClick={logoutUser}>
                Log out
            </button>
        </div>
    )
}