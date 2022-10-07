const defaultState ={
	events: []
}

const LOAD_EVENTS = "LOAD_EVENTS"

export const eventsReducer = (state = defaultState, action) => {
	switch (action.type) {
		case LOAD_EVENTS:
			return {...state, events: action.payload}
		default:
			return state
	}
}

export const loadEventsAction = (payload) => ({type: LOAD_EVENTS, payload})