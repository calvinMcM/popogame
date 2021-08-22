import {ActionType} from "typesafe-actions";
import * as MapActions from "./MapActions";
import * as UnitActions from "./UnitActions";


export type Action = 
    | ActionType<typeof MapActions>
    | ActionType<typeof UnitActions>
;