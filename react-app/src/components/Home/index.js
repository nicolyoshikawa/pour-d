import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../store/session";

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    
    const logoutUser = async () => {
        await dispatch(logout());
        history.push("/");
      };
    
    return (
        <div>
            <p>
                Home page here
            </p>
            <button onClick={logoutUser}>
                Log out
            </button>
        </div>
    )
}