
import { MapScene, SCREEN_DIM } from './components/MapScene';

function run(){
    const ele = document.getElementById("phsaer");
    console.log("Container:", ele);
    const game = new Phaser.Game({
        type: Phaser.AUTO,
        parent: "phsaer",
        backgroundColor: "blue",
        scale: {
            width: SCREEN_DIM.x,
            height: SCREEN_DIM.y,
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        scene: [MapScene],
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 } // Top down game, so no gravity
            }
        }
    });
    return game;
};

run();