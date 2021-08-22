import { ActorData, TileData } from "../state/Definitions";
import { Boulder } from "../state/Obstacles/Boulder";
import { Bush } from "../state/Obstacles/Bush";
import { Dude } from "../state/Obstacles/Dude";
import { TallGrass } from "../state/Obstacles/TallGrass";
import { Tree } from "../state/Obstacles/Tree";

export class ActorsState{
    constructor(
        public readonly id: string,
        public readonly actor: ActorData,
        public readonly position: {x: number, y: number} | null,
    ){}
}
export type ActorMapping = {[k: string]: ActorsState};


const default_actors: ActorMapping = {
    // "tree0001": new ActorsState("tree0001", new Tree(), {x:3, y:0}),
    // "rock0001": new ActorsState("rock0001", new Boulder(), {x:6, y:0}),
    // "bush0001": new ActorsState("bush0001", new Bush(), {x:9, y:0}),
    // "rock0002": new ActorsState("rock0002", new Boulder(), {x:13, y:1}),
    // "rock0003": new ActorsState("rock0003", new Boulder(), {x:5, y:2}),
    // "tree0002": new ActorsState("tree0002", new Tree(), {x:15, y:2}),

    // "tall0001": new ActorsState("tall0001", new TallGrass(), {x:14, y:4}),
    // "rock0004": new ActorsState("rock0004", new Boulder(), {x:6, y:5}),
    // "tree0003": new ActorsState("tree0003", new Tree(), {x:11, y:5}),
    // "bush0002": new ActorsState("bush0002", new Bush(), {x:9, y:6}),
    
    // "tree0004": new ActorsState("tree0004", new Tree(), {x:6, y:8}),
    // "tall0002": new ActorsState("tall0002", new TallGrass(), {x:8, y:9}),
    // "bush0003": new ActorsState("bush0003", new Bush(), {x:1, y:10}),
    // "rock0005": new ActorsState("rock0005", new Boulder(), {x:6, y:10}),
    // "tall0003": new ActorsState("tall0003", new TallGrass(), {x:7, y:10}),
    // "tall0004": new ActorsState("tall0004", new TallGrass(), {x:8, y:10}),
    // "tree0005": new ActorsState("tree0005", new Tree(), {x:11, y:10}),
    // "tall0005": new ActorsState("tall0005", new TallGrass(), {x:14, y:10}),
    
    // "rock0006": new ActorsState("rock0006", new Boulder(), {x:12, y:13}),
    // "bush0004": new ActorsState("bush0004", new Bush(), {x:14, y:13}),
    // "tall0006": new ActorsState("tall0006", new TallGrass(), {x:6, y:14}),
    // "bush0005": new ActorsState("bush0005", new Bush(), {x:14, y:14}),
    // "tree0006": new ActorsState("tree0006", new Tree(), {x:2, y:15}),
    // "tall0007": new ActorsState("tall0007", new TallGrass(), {x:7, y:15}),
    // "tall0008": new ActorsState("tall0008", new TallGrass(), {x:8, y:15}),

    // "dude0001": new ActorsState("dude0001", new Dude(), {x:3, y:2}),
    // "dude0002": new ActorsState("dude0002", new Dude(), {x:13, y:2}),
    // "dude0003": new ActorsState("dude0003", new Dude(), {x:1, y:4}),
    // "dude0004": new ActorsState("dude0004", new Dude(), {x:8, y:6}),
    // "dude0005": new ActorsState("dude0005", new Dude(), {x:5, y:13}),
    // "dude0006": new ActorsState("dude0006", new Dude(), {x:12, y:14}),
}

export class SessionState{
    constructor(
        public readonly map: TileData[][] = [[]],
        public readonly hover: Phaser.Geom.Point|null = null,
        public readonly selection: TileData|null = null,
        public readonly rotation: number = 0,
        public readonly actors: ActorMapping = default_actors,
    ){}
}