import { applyMiddleware, createStore } from "redux";
import { SessionReducer } from "./reducers/SessionReducer";
import { SessionState } from "./SessionState";


const store =  createStore(SessionReducer, new SessionState());
export default store;