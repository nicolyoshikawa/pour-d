const GET_USER = "users/GET_USER"

const getUser = (user) => ({
    type: GET_USER,
    user
})

export const loadUser = (id) => async dispatch => {
    const res = await fetch(`/api/users/${id}`, {
        method: "GET"
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(getUser(data))
        return(data)
    }
}

const initialState = {}

export default function users (state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_USER:
            newState = {user: action.user}
            return newState
        default:
            return state
    }
}