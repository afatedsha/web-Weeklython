const defaultState ={
	objects: []
}

const LOAD_OBJECTS = "LOAD_OBJECTS"

export const objectsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_OBJECTS:
			return {...state, objects: action.payload}
		default:
			return state
	}
}

export const loadObjectsAction = (payload) => ({type: LOAD_OBJECTS, payload})