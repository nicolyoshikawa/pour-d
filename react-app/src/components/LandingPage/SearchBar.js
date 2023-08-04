import "./LandingPage.css"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loadAllDrinks } from "../../store/drinks"

export default function SearchBar() {
    const dispatch = useDispatch()

    const drinks = useSelector(state => state.drinks) // Get all drinks for search bar to query
    const [searchInput, setSearchInput] = useState("")
    let hideDiv

    useEffect(() => {
        dispatch(loadAllDrinks())
    }, [dispatch])

    
    if (drinks) {
        let filterDrinks = Object.values(drinks).filter((drink) => {
            if (searchInput.length && drink.name.toLowerCase().includes(searchInput.toLowerCase())) {
                return drink
            }
        })
        
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
                                    {drink.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}