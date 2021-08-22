
export const TILE_WIDTH = 100
export const TILE_DEPTH = 60
export const TILE_HEIGHT = 20
export type TileProps = {h: number}
export class TileData {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly h: number,
        public readonly u: number,
        public readonly v: number,
        public readonly t: BlockType,
        public readonly a: string,
        public readonly variant: number = 0,
    ){}

    static from(o: TileData): TileData{
        return new TileData(o.x, o.y, o.h, o.u, o.v, o.t, o.a);
    }

    static equal(a: TileData|null, b: TileData|null){
        if(a == null && a == b){
            return true
        }
        else if(a == null || b == null){
            return false
        }
        return (a.u == b.u && a.v==b.v)// && a.h==b.h);
    }
}

export class BlockContext{
    constructor(
        public readonly Center: TileData | null,
        public readonly N: TileData | null,
        public readonly NE: TileData | null,
        public readonly E: TileData | null,
        public readonly SE: TileData | null,
        public readonly S: TileData | null,
        public readonly SW: TileData | null,
        public readonly W: TileData | null,
        public readonly NW: TileData | null,
    ){}

    private static getOrNull(map: TileData[][], x: number, y: number){
        if(y < 0 || y >= map.length || x < 0 || x >= map[0].length){
            return null;
        }
        return map[y][x];
    }

    static fromMapContext(map: TileData[][], x: number, y: number){
        return new BlockContext(
            BlockContext.getOrNull(map, x, y),
            BlockContext.getOrNull(map, x, y-1),
            BlockContext.getOrNull(map, x+1, y-1),
            BlockContext.getOrNull(map, x+1, y),
            BlockContext.getOrNull(map, x+1, y+1),
            BlockContext.getOrNull(map, x, y+1),
            BlockContext.getOrNull(map, x-1, y+1),
            BlockContext.getOrNull(map, x-1, y),
            BlockContext.getOrNull(map, x-1, y-1),
        )
    }

    static isolated(tileData: TileData){
        return new BlockContext(
            tileData,
            null, null, null, null,
            null, null, null, null
        );
    }
}

export enum BlockType {
    GRASS="grass",
    DIRT="dirt",
    WATER="water",
    SAND="sand",
    ROCK="rock",
    CASTLE="castle",
}
export module BlockType{
    export const List: BlockType[] = [BlockType.GRASS, BlockType.DIRT, BlockType.WATER, BlockType.SAND, BlockType.ROCK, BlockType.CASTLE];
}

export class SpriteData{
    constructor(
        public readonly xOffset: number,
        public readonly yOffset: number,
        public readonly img_key: string,
        public readonly xScale: number = 1,
        public readonly yScale: number = 1,
    ){}
}

export class SpriteSheetData{
    constructor(
        public readonly sprites: {[k: string]: SpriteData}
    ){}
}

export class ActorStats {
    public readonly isDead: boolean;
    constructor(
        public readonly max_hp: number,
        public readonly curr_hp: number,
        public readonly move: number,
        public readonly jump: number,
    ){
        this.isDead = curr_hp != 0;
    }
}


export class ActorData {
    constructor(
        public readonly name: string,
        public readonly team: number,
        public readonly maxHP: number,
        public readonly curHP: number,
        public readonly move: number,
        public readonly jump: number,
    ){}
}

const imgs: {[k: string]: HTMLImageElement} = {}
export async function getImage(src: string){
    if(!imgs[src]){
        imgs[src] = await new Promise((resolve, reject) => {
            loadImage(src, resolve)
        });
    }
    return imgs[src];
}

export function loadImage(source: string, callback: (img: HTMLImageElement) => void) {
    const img = new Image();
    img.onload = function () {
        callback(img);
    };
    img.src = source;
}

export const terrainMapping = {
    "grass": { // Grass
        left:{fill: "#966a18", stroke: "#966a18"},
        right:{fill: "#a6751b", stroke: "#a6751b"},
        top:{fill: "#1cad25", stroke: "#0c9d15", img: "public/GrassPattern.png"}
    },
    "dirt": { // Dirt
        left:{fill: "#966a18", stroke: "#966a18"},
        right:{fill: "#a6751b", stroke: "#a6751b"},
        top:{fill: "#bd851e", stroke: "#ad750e"}
    },
    "water": { // Water
        left:{fill: "#1b5aa6", stroke: "#1b5aa6"},
        right:{fill: "#1c5fb0", stroke: "#1c5fb0"},
        top:{fill: "#1e66bd", stroke: "#0e56ad"}
    }
}