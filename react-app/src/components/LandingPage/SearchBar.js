import { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import "./LandingPage.css"

export default function SearchBar() {
    const [searchInput, setSearchInput] = useState("")
    const history = useHistory()

    const submitSearch = (e) => {
        history.push("/")
    }
    return (
        <div className="landing-search">
            <form>
                <input
                    className="search-input"
                    name="search"
                    placeholder="Find a beer"
                    onChange={(e) => setSearchInput(e)}
                />
                <button className="submit-search">
                    SEARCH
                </button>
            </form>
        </div>
    )
}