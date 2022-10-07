const defaultState ={
	users: []
}

const LOAD_USERS = "LOAD_USERS"

export const usersReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_USERS:
			return {...state, users: action.payload}
		default:
			return state
	}
}

export const loadUsersAction = (payload) => ({type: LOAD_USERS, payload})