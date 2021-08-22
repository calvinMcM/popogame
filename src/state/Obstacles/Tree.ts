import {ActorStats, Obstacle, SpriteData, SpriteSheetData} from "../Definitions"

const TreeSpriteSheetData = new SpriteSheetData({
    "Tree1": new SpriteData(-1.4, -10.2, "Tree1", 10, 10),
});

export class Tree extends Obstacle{
    constructor(){
        super("Tree", new ActorStats(5,5,0,0), "", "Tree1", TreeSpriteSheetData)
    }
}