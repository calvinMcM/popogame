import { ActorMapping } from '../redux/SessionState';
import { BlockType, TILE_DEPTH, TILE_WIDTH, TileData } from './Definitions';


const fld_act: (string|null)[][] = [
    [null,null,"tree0001",null, null,"rock0001",null,null,      "bush0001",null,null,null,      null,null,null,null],
    [null,null,null,null,       null,null,null,null,            null,null,null,null,            null,"rock0002",null,null],
    [null,null,null,"A01",      null,"rock0003",null,null,      null,null,null,null,            null,"dude0002", null, "tree0002"],
    [null,null,null,null,       null,null,null,null,            null,null,null,null,            null,null,null,null],
    
    [null,"dude0003",null,null, null,null,null,null,            null,null,null,null,            null,null,"tall0001",null],
    [null,null,null,null,       null,null,"rook0004",null,      null,null,null,"tree0003",      null,null,null,null],
    [null,null,null,null,       null,null,null,null,            "dude0004",null,null,null,      null,"bush0002",null,null],
    [null,null,null,null,       null,null,null,null,            null,null,null,null,            null,null,null,null],
    
    [null,null,null,null,       null,"tree0004",null,null,      null,null,null,null,            null,null,null,null],
    [null,null,null,null,       null,null,null,null,            "tall0002",null,null,null,      null,null,null,null],
    [null,"bush0003",null,null, null,null,"rock0005","tall0003","tall0004",null,null,"tree0005",null,null,"tall0005",null],
    [null,null,null,null,       null,null,null,null,            null,null,null,null,            null,null,null,null],
    
    [null,null,null,null,       null,null,null,null,            null,null,null,null,            null,null,null,null],
    [null,null,null,null,       null,"dude0004",null,null,      null,null,null,null,            "rock0006",null,"bush0004",null],
    [null,null,null,null,       null,null,"tall0006",null,      null,null,null,null,            null,"dude0006","bush0005",null],
    [null,null,"tree0006",null, null,null,null,"tall0007",      "tall0008",null,null,null,      null,null,null,null],
]

const heightField = Array.from({length:16}, () => Array.from({length: 16}, () => Math.floor(Math.random() * 3)))
const varianceField = Array.from({length:16}, () => Array.from({length: 16}, () => Math.floor(Math.random() * 3)))

function mapTerrain(code: string){
    switch(code){
        case 'w': return BlockType.WATER;
        case 'g': return BlockType.GRASS;
        case 's': return BlockType.SAND;
        case 'r': return BlockType.ROCK;
        case 'c': return BlockType.CASTLE;
        default: return BlockType.DIRT;
    }
}

function zipMaps(heightMap: number[][], terrainMap: string[][], actorMap: (string|null)[][]): Pick<TileData, "h"|"t"|"variant">[][]{
    const map = []
    for(let i = 0; i < heightMap.length; i++){
        let rank = [];
        for(let j = 0; j < heightMap[i].length; j++){
            rank.push(
                {
                    h: heightMap[i][j],
                    t: mapTerrain(terrainMap[i][j]),
                    a: actorMap[i][j],
                    variant: varianceField[i][j]
                }
            )
        }
        map.push(rank);
    }
    return map;
}

function isometric_field_transform(mtx: {h: number, t: BlockType, variant: number, a: string}[][]): TileData[][]{
    const width = mtx.length
    const height = mtx[0].length
    const transform = []
    for(let y=0; y < width; y++){
        let rank = []
        for(let x=0; x < height; x++){
            rank.push(new TileData(
                // x * TILE_WIDTH / 2 - y * TILE_WIDTH / 2,
                // (y * TILE_DEPTH /2  + x * TILE_DEPTH /2),
                x * TILE_WIDTH / 2 - y * TILE_WIDTH / 2,
                (y * TILE_DEPTH / 2  + x * TILE_DEPTH / 2),
                mtx[y][x].h,
                x,
                y,
                mtx[y][x].t,
                mtx[y][x].a,
                mtx[y][x].variant
            ))
        }
        transform.push(rank)
    }
    return transform
}

function rotateMap(times: number, map: any[][]){
    let current = map;
    for(let t = 0; t < times; t++){
        let rotated = Array.from({length: map[0].length}, a => Array.from({length: map.length}, b => b));
        for(let f = 0; f < map.length; f++){
            for(let r = 0; r < map[f].length; r++){
                const fgap = map.length - f
                const rgap = map[f].length - r;
                const fNew = map.length - rgap;
                const rNew = map[f].length - fgap;
                console.log(`(${f},${r}) := (${fNew},${rNew})`)
                rotated[f][r] = current[fNew][rNew]
            }
        }
        current = rotated;
    }
    return current
}

export async function generateMap(sid: string, rotation: number = 0, actors: ActorMapping): Promise<{teams: any[], map: TileData[][]}>{
    
    const htData = await fetch("http://localhost:5000/session/" + sid);
    const j = await htData.json();
    console.log(j, htData.status);
    const {teams, map: {height: fld_ht, terrain: fld_tr}} = j;
    const map = zipMaps(fld_ht, fld_tr, fld_act)
    console.log("Rotated:", rotation);
    const rotated = rotateMap(rotation, map)
    const t: TileData[][] = isometric_field_transform(rotated);


    return {
        map: t,
        teams: teams
    };
}