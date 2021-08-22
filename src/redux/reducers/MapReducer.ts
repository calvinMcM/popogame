import { getType } from "typesafe-actions";
import { Action } from "../actions/Actions";
import { MAP_SET } from "../actions/MapActions";
import { SessionState } from "../SessionState";
import { rewrite } from "./rewriteHelper";


export const MapReducer = (state: SessionState, action: Action) => {
    let newState = state;
    if(state == undefined){
        newState = new SessionState();    
    }
    switch(action.type){
        case "map/set":
            newState = new SessionState((action as any).payload);
            break;
        case "map/selection/set":
            newState = rewrite(state, {selection: action.payload});
            break;
        case "map/hover/set":
            newState = rewrite(state, {hover: action.payload});
            break;
        case "map/rotation/set":
            newState = rewrite(state, {rotation: action.payload});
            break;
        case "map/edit/type/set":
            state.map[action.payload.y][action.payload.x] = rewrite(state.map[action.payload.y][action.payload.x], {t: action.payload.type});
            newState = new SessionState(state.map, state.hover, state.selection, state.rotation, state.actors);
            break;
    }
    return newState;
}