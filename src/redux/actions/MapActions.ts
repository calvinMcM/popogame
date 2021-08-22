import { createAction } from "typesafe-actions";
import { BlockType, TileData } from "../../state/Definitions";

export const MAP_SET = createAction("map/set", //).map(
    resolve => {
        return (data: TileData[][]) => resolve(data)
    }
);

export const MAP_SEL_SET = createAction("map/selection/set", resolve => {
    return (data: TileData) => resolve(data)
});

export const MAP_HOV_SET = createAction("map/hover/set", resolve => {
    return (data: Phaser.Geom.Point) => resolve(data)
});

export const MAP_ROT_SET = createAction("map/rotation/set", resolve => {
    return (rotation: number) => resolve(rotation)
});

export const MAP_EDIT_SET_TYPE = createAction("map/edit/type/set", resolve => {
    return (x: number, y:number, type: BlockType) => resolve({x, y, type})
});