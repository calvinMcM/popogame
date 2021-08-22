import { createAction } from "typesafe-actions";
import { BlockType, TileData } from "../../state/Definitions";
import { ActorsState } from "../SessionState";

export const CHAR_SET = createAction("char/set", //).map(
    resolve => {
        return (actor: ActorsState) => resolve(actor)
    }
);