import { getType } from "typesafe-actions";
import { Action } from "../actions/Actions";
import { MAP_SET } from "../actions/MapActions";
import { SessionState } from "../SessionState";


export const UnitReducer = (state: SessionState, action: Action) => {
    let newState = state;
    if(state == undefined){
        newState = new SessionState();    
    }
    switch(action.type){
        case "char/set":
            const actors = Object.assign({}, state.actors, {[action.payload.id]: action.payload});
            newState = new SessionState(state.map, state.hover, state.selection, state.rotation, actors);
            break;
    }
    return newState;
}