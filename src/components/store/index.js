import {createStore, combineReducers} from "redux";
import { eventsReducer } from "./eventsReducer";
import { objectsReducer } from "./objectsReducer";
import { campusesReducer } from "./campusesReducer";
import { objectTypesReducer } from "./objectTypeReducer";
import { usersReducer } from "./usersReducer";


const rootReducer = combineReducers({
	events: eventsReducer,
	objects: objectsReducer,
	campuses: campusesReducer,
	objectTypes: objectTypesReducer,
	users: usersReducer
})

export const store = createStore(rootReducer)