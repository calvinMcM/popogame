import {ActorStats, Obstacle, SpriteData, SpriteSheetData} from "../Definitions"

const TallGrassSpriteSheetData = new SpriteSheetData({
    "TallGrass1": new SpriteData(1.6, -.7, "TallGrass1", 10, 10),
});

export class TallGrass extends Obstacle{
    constructor(){
        super("Tall Grass", new ActorStats(2,2,0,0), "", "TallGrass1", TallGrassSpriteSheetData)
    }
}