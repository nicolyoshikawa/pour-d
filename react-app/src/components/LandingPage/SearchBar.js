import "./LandingPage.css"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom" // Links will be implemented after drink detail pages complete
import { useDispatch, useSelector } from "react-redux"
import { loadAllDrinks } from "../../store/drinks"

export default function SearchBar() {
    const dispatch = useDispatch()

    const drinks = useSelector(state => state.drinks) // Load all drinks for search bar to query
    const [searchInput, setSearchInput] = useState("") // Set current query to user's input
    let hideDiv // Used for removing border if search results are empty

    useEffect(() => {
        dispatch(loadAllDrinks())
    }, [dispatch])

    
    if (drinks) {
        // Create array of drinks with name matching current input from user
        let filterDrinks = Object.values(drinks).filter((drink) => {
            if (searchInput.length && drink.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return drink
            }
        })
        
        // Remove border if results are empty
        if (searchInput.length && filterDrinks.length) {
            hideDiv = "results"
        } else {
            hideDiv = "results-hide"
        }

        return (
            <div className="landing-search">
                <form>
                    <input
                        className="search-input"
                        placeholder="Find a beer"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </form>
                <div className={hideDiv}>
                    {
                        filterDrinks?.map((drink) => {
                            return (
                                <div className="result" key={drink.id}>
                                    <NavLink to={`/drinks/${drink.id}`}>{drink.name}</NavLink>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}