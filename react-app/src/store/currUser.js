const USER_DRINKS = "currUser/USER_DRINKS"
const USER_FRIENDS = "currUser/USER_FRIENDS"

const userDrinks = (drinks) => ({
	type: USER_DRINKS,
	drinks
  })

const userFriends = (friends) => ({
    type: USER_FRIENDS,
    friends
})

export const getUserDrinks = () => async (dispatch) => {
	const res = await fetch(`api/currentUser/drinks`, {
	  method: "GET"
	}) 
  
	if (res.ok) {
	  const data = await res.json()
	  dispatch(userDrinks(data))
	  return data
	}
}

export const getUserFriends = () => async (dispatch) => {
    const res = await fetch("api/currentUser/friends", {
        method: "GET"
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(userFriends(data))
        return data
    }
}

const initialState = {}
export default function reducer(state = initialState, action) {
    let newState = {...state}
    switch(action.type) {
        case USER_DRINKS:
            newState = {...state, drinks: action.drinks}
            return newState
        case USER_FRIENDS:
            newState = {...state, friends: action.friends}
            return newState
        default:
            return state
    } 
}