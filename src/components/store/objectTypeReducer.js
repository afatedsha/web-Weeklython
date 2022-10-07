const defaultState ={
	objectTypes: []
}

const LOAD_OBJECT_TYPES = "LOAD_OBJECT_TYPES"

export const objectTypesReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_OBJECT_TYPES:
			return {...state, objectTypes: action.payload}
		default:
			return state
	}
}

export const loadObjectTypesAction = (payload) => ({type: LOAD_OBJECT_TYPES, payload})