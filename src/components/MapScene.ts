import Phaser from "phaser";
import { Unsubscribe } from "redux";

export const SCREEN_DIM: Phaser.Geom.Point = new Phaser.Geom.Point(800, 600);

export class MapScene extends Phaser.Scene {
    private offset: Phaser.Geom.Point;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private storeUnsubscribe: Unsubscribe | null = null;
    private players: {name: string, controller: string, sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody }[] = [
        {name: "p1", controller: "keyboard", sprite: null as any}
    ];

    constructor() {
        super("GameScene");
        this.offset = new Phaser.Geom.Point(0, 0);
        this.cursors = null as any;
    }

    preload() {
        this.load.spritesheet("fem", "/public/f0202.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("LPC_Remodeled", "/public/LPC_Remodeled.png");
        this.load.image("bridge", "/public/bridge.png");
        this.load.image("Collisions", "/public/Collisions.png");
        this.load.tilemapTiledJSON("map", "/public/world.json");
        
    }

    create() {
        this.offset = new Phaser.Geom.Point(0, 0);
        const map = this.add.tilemap("map", 32, 32, 32, 32);
        const base_tileset = map.addTilesetImage("LPC_Remodeled", "LPC_Remodeled");
        const bridge_tileset = map.addTilesetImage("bridge", "bridge");
        const coll_tileset = map.addTilesetImage("Collisions", "Collisions");
        const base = map.createLayer("Ground", [base_tileset, bridge_tileset]);
        const props1 = map.createLayer("Props_1", [base_tileset, bridge_tileset]);
        const coll = map.createLayer("Collisions", [coll_tileset]);
        coll.setCollisionByProperty({ walkable: false });
        // props1.setCollisionByProperty({ walkable: false });
        

        this.anims.create({key: "walk-down", repeat: -1, frameRate: 12, yoyo: true, frames: this.anims.generateFrameNumbers("fem", {start:0, end:2})})
        this.anims.create({key: "walk-left", repeat: -1, frameRate: 12, yoyo: true, frames: this.anims.generateFrameNumbers("fem", {start:3, end:5})})
        this.anims.create({key: "walk-right", repeat: -1, frameRate: 12, yoyo: true, frames: this.anims.generateFrameNumbers("fem", {start:6, end:8})})
        this.anims.create({key: "walk-up", repeat: -1, frameRate: 12, yoyo: true, frames: this.anims.generateFrameNumbers("fem", {start:9, end:11})})
        // this.players[0].sprite.play("walk-down");

        this.players.forEach(player => {
            player.sprite = this.physics.add.sprite(160, 160, "fem", 1);
            player.sprite.body.setSize(24, 20);
            player.sprite.body.offset.x = 4;
            player.sprite.body.offset.y = 12;
        })


        const debugGraphics = this.add.graphics().setAlpha(0.75);
        [coll].forEach((l) => {
            // l.renderDebug(debugGraphics, {
            //     tileColor: null, // Color of non-colliding tiles
            //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            //     faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
            // });

            this.players.forEach(player => {
                if(player.sprite){
                    this.physics.add.collider(player.sprite, l);
                }
            });
        });

        this.cameras.main.setBounds(0,0, 64 * 32, 64 * 32);
        this.cameras.main.startFollow(this.players[0].sprite).setZoom(1.5);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        if (this.players[0].sprite !== null) {
            let vel = new Phaser.Geom.Point(0,0);
            
            // Horizontal movement
            if (this.cursors.left.isDown) {
                vel.setTo(-100, vel.y);
            } else if (this.cursors.right.isDown) {
                vel.setTo(100, vel.y);
            }

            // Vertical movement
            if (this.cursors.up.isDown) {
                vel.setTo(vel.x, -100)
            } else if (this.cursors.down.isDown) {
                vel.setTo(vel.x, 100);
            }
            
            this.players[0].sprite.body.setVelocity(vel.x, vel.y);

            if (vel.x > 0){
                this.players[0].sprite.play("walk-right", true);
            }
            else if(vel.x < 0){
                this.players[0].sprite.play("walk-left", true);
            }
            else if(vel.y > 0){
                this.players[0].sprite.play("walk-down", true);
            }
            else if(vel.y < 0){
                this.players[0].sprite.play("walk-up", true);
            }
            else{
                this.players[0].sprite.stop()
            }

            // Normalize and scale the velocity so that this.players[0].sprite can't move faster along a diagonal
            this.players[0].sprite.body.velocity.normalize().scale(100);
            // if(Phaser.Geom.Point.GetMagnitude(vel) == 0){
            //     this.players[0].sprite.stop();
            // }
        }
    }

    destroy() {
        this.storeUnsubscribe && this.storeUnsubscribe();
    }
}