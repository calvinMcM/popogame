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
    }

    render() {
        return (
            <div id="phaser"></div>
        );
    }
}