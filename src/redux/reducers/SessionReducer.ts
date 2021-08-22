import { Action } from "../actions/Actions";
import { SessionState } from "../SessionState";
import { MapReducer } from "./MapReducer";
import { UnitReducer } from "./UnitReducer";


export const SessionReducer: (state: SessionState|undefined, action: Action) => SessionState = (state: SessionState|undefined, action: Action) => {
    console.log("Received Action:", action);
    let newState: SessionState = state as SessionState;
    if(state == undefined){
        newState = new SessionState();    
    }
    if(action.type.startsWith("map/")){
        newState = Object.assign(newState, MapReducer(newState, action));
    }
    else if(action.type.startsWith("char/")){
        newState = Object.assign(newState, UnitReducer(newState, action));
    }
    return newState;
}