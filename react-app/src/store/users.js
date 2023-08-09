const GET_USERS = "users/GET_USERS"

const getUsers = (users) => ({
    type: GET_USERS,
    users
})

export const loadUsers = () => async dispatch => {
    const res = await fetch(`/api/users`, {
        method: "GET"
    })

    if (res.ok) {
        const data = await res.json()
        dispatch(getUsers(data))
        return(data)
    }
}

const initialState = {}

export default function users (state = initialState, action) {
    let newState = {}
    switch (action.type) {
        case GET_USERS:
            action.users.forEach((user) => {
                newState[user.id] = user
            })
            return newState
        default:
            return state
    }
}