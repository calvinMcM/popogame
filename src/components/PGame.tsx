import Phaser from 'phaser';
import * as React from 'react';
import { MapScene, SCREEN_DIM } from './MapScene';

export class PGame extends React.Component<{}, {}>{

    private game: Phaser.Game;
    constructor(props: {}, context: any) {
        super(props, context);
        this.game = null as any;
    }

    componentDidMount() {
        const ele = document.getElementById("phsaer");
        console.log("Container:", ele)
        this.game = new Phaser.Game({
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
        })
    }

    render() {
        return (
            <div id="phsaer"></div>
        );
    }
}