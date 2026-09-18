import { createStore, combineReducers } from "redux";
import props from "./props";

const rootReducer = combineReducers({ props });
export const store = createStore(rootReducer);
