import {ActorStats, Obstacle, SpriteData, SpriteSheetData} from "../Definitions"

const BoulderSpriteSheetData = new SpriteSheetData({
    "Boulder1": new SpriteData(1.6, -.7, "Boulder1", 10, 10),
    "Boulder2": new SpriteData(1.6, -.7, "Boulder2", 10, 10),
});

export class Boulder extends Obstacle{
    constructor(){
        super("Boulder", new ActorStats(4,4,0,0), "", Boulder.getSkin(), BoulderSpriteSheetData)
    }
    static getSkin(){
        switch(Math.floor(Math.random() * 2)){
            case 1: return "Boulder2";
            default: return "Boulder1";
        }
    }
}