const defaultState ={
	campuses: []
}

const LOAD_CAMPUSES = "LOAD_CAMPUSES"

export const campusesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_CAMPUSES:
			return {...state, campuses: action.payload}
		default:
			return state
	}
}

export const loadCampusesAction = (payload) => ({type: LOAD_CAMPUSES, payload})