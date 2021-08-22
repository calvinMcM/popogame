import Phaser from "phaser";
import { Unsubscribe } from "redux";

export const SCREEN_DIM: Phaser.Geom.Point = new Phaser.Geom.Point(800, 600);

export class MapScene extends Phaser.Scene {
    private offset: Phaser.Geom.Point;
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private wasd: any;
    private ijkl: any;
    private storeUnsubscribe: Unsubscribe | null = null;
    private players: {
        name: string;
        controller: string;
        sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        sheet: string;
    }[] = [
        { name: "p1", controller: "cursors", sprite: null as any, sheet: "fem" },
        { name: "p2", controller: "wasd", sprite: null as any, sheet: "mal" },
        { name: "p3", controller: "ijkl", sprite: null as any, sheet: "sol" },
        { name: "p4", controller: "ijkl", sprite: null as any, sheet: "sol" },
    ];
    private me: number;

    constructor() {
        super("GameScene");
        this.offset = new Phaser.Geom.Point(0, 0);
        this.cursors = null as any;
        this.wasd = null as any;
        this.ijkl = null as any;
        this.me = 0;
    }

    preload() {
        this.load.spritesheet("fem", "/public/f0202.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("mal", "/public/m0501.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("sol", "/public/s0402.png", { frameWidth: 32, frameHeight: 32 });
        this.load.image("LPC_Remodeled", "/public/LPC_Remodeled.png");
        this.load.image("bridge", "/public/bridge.png");
        this.load.image("Collisions", "/public/Collisions.png");
        this.load.tilemapTiledJSON("map", "/public/world.json");
    }

    createAnims(key: string) {
        this.anims.create({
            key: key + "-walk-down",
            repeat: -1,
            frameRate: 12,
            yoyo: true,
            frames: this.anims.generateFrameNumbers(key, { start: 0, end: 2 }),
        });
        this.anims.create({
            key: key + "-walk-left",
            repeat: -1,
            frameRate: 12,
            yoyo: true,
            frames: this.anims.generateFrameNumbers(key, { start: 3, end: 5 }),
        });
        this.anims.create({
            key: key + "-walk-right",
            repeat: -1,
            frameRate: 12,
            yoyo: true,
            frames: this.anims.generateFrameNumbers(key, { start: 6, end: 8 }),
        });
        this.anims.create({
            key: key + "-walk-up",
            repeat: -1,
            frameRate: 12,
            yoyo: true,
            frames: this.anims.generateFrameNumbers(key, { start: 9, end: 11 }),
        });
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

        // this.players[0].sprite.play("walk-down");

        this.players.forEach((player, i) => {
            player.sprite = this.physics.add.sprite(160 + i * 32, 160, player.sheet, 1);
            this.createAnims(player.sheet);
            // switch (i) {
            //     case 0:
            //         player.sprite = this.physics.add.sprite(160, 160, "fem", 1);
            //         this.createAnims("fem");
            //         break;
            //     case 1:
            //         player.sprite = this.physics.add.sprite(192, 160, "mal", 1);
            //         this.createAnims("mal");
            //         break;
            //     default:
            //         player.sprite = this.physics.add.sprite(160 + i * 32, 160, "sol", 1);
            //         this.createAnims("sol");
            //         break;
            // }
            player.sprite.body.setSize(24, 20);
            player.sprite.body.offset.x = 4;
            player.sprite.body.offset.y = 12;
        });

        const debugGraphics = this.add.graphics().setAlpha(0.75);
        [coll].forEach((l) => {
            // l.renderDebug(debugGraphics, {
            //     tileColor: null, // Color of non-colliding tiles
            //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            //     faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
            // });

            this.players.forEach((player, i) => {
                if (player.sprite) {
                    this.physics.add.collider(player.sprite, l);
                    this.players.filter((v,j) => j > i).forEach(v => {
                        if(v.sprite){
                            this.physics.add.collider(player.sprite, v.sprite)
                        }
                    })
                }
            });
        });

        this.cameras.main.startFollow(this.players[this.me].sprite).setZoom(1.5);
        this.cameras.main.setName("0");
        this.cameras.main.setViewport(0, 0, SCREEN_DIM.x / 2, SCREEN_DIM.y / 2);
        this.cameras.add(SCREEN_DIM.x / 2, 0, SCREEN_DIM.x / 2, SCREEN_DIM.y / 2, false, "1");
        this.cameras.add(SCREEN_DIM.x / 2, SCREEN_DIM.y / 2, SCREEN_DIM.x / 2, SCREEN_DIM.y / 2, false, "2");
        this.cameras.add(0,SCREEN_DIM.y / 2, SCREEN_DIM.x / 2, SCREEN_DIM.y / 2, false, "3");

        this.players.forEach((player, i) => {
            const cam = this.cameras.getCamera(i.toString());
            cam.startFollow(player.sprite);
            cam.setBounds(0, 0, 64 * 32, 64 * 32);
            cam.setSize(SCREEN_DIM.x / 2, SCREEN_DIM.y / 2);
        });
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            SVGPathSegCurvetoQuadraticSmoothRel: Phaser.Input.Keyboard.KeyCodes.X,
        });
        this.ijkl = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.I,
            down: Phaser.Input.Keyboard.KeyCodes.K,
            left: Phaser.Input.Keyboard.KeyCodes.J,
            right: Phaser.Input.Keyboard.KeyCodes.L,
            space: Phaser.Input.Keyboard.KeyCodes.M,
        });
    }

    useCursors(i: number) {
        const player = this.players[i];
        let vel = new Phaser.Geom.Point(0, 0);

        // Horizontal movement
        if (this.cursors.left.isDown) {
            vel.setTo(-100, vel.y);
        } else if (this.cursors.right.isDown) {
            vel.setTo(100, vel.y);
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            vel.setTo(vel.x, -100);
        } else if (this.cursors.down.isDown) {
            vel.setTo(vel.x, 100);
        }

        player.sprite.body.setVelocity(vel.x, vel.y);

        if (vel.x > 0) {
            player.sprite.play(player.sheet + "-walk-right", true);
        } else if (vel.x < 0) {
            player.sprite.play(player.sheet + "-walk-left", true);
        } else if (vel.y > 0) {
            player.sprite.play(player.sheet + "-walk-down", true);
        } else if (vel.y < 0) {
            player.sprite.play(player.sheet + "-walk-up", true);
        } else {
            player.sprite.stop();
        }

        // Normalize and scale the velocity so that this.players[0].sprite can't move faster along a diagonal
        player.sprite.body.velocity.normalize().scale(100);
    }

    useKeys(i: number, keys: Phaser.Types.Input.Keyboard.CursorKeys) {
        const player = this.players[i];
        let vel = new Phaser.Geom.Point(0, 0);
        console.log(this.wasd);
        // Horizontal movement
        if (keys["left"].isDown) {
            vel.setTo(-100, vel.y);
        } else if (keys["right"].isDown) {
            vel.setTo(100, vel.y);
        }

        // Vertical movement
        if (keys["up"].isDown) {
            vel.setTo(vel.x, -100);
        } else if (keys["down"].isDown) {
            vel.setTo(vel.x, 100);
        }

        player.sprite.body.setVelocity(vel.x, vel.y);

        if (vel.x > 0) {
            player.sprite.play(player.sheet + "-walk-right", true);
        } else if (vel.x < 0) {
            player.sprite.play(player.sheet + "-walk-left", true);
        } else if (vel.y > 0) {
            player.sprite.play(player.sheet + "-walk-down", true);
        } else if (vel.y < 0) {
            player.sprite.play(player.sheet + "-walk-up", true);
        } else {
            player.sprite.stop();
        }

        // Normalize and scale the velocity so that this.players[0].sprite can't move faster along a diagonal
        player.sprite.body.velocity.normalize().scale(100);
    }

    public useWasd = (i: number) => this.useKeys(i, this.wasd);
    public useIjkl = (i: number) => this.useKeys(i, this.ijkl);

    update() {
        this.players.forEach((player, i) => {
            player.sprite.setDepth(player.sprite.y)
            switch (player.controller) {
                case "cursors":
                    this.useCursors(i);
                    break;
                case "wasd":
                    this.useWasd(i);
                    break;
                case "ijkl":
                    this.useIjkl(i);
                    break;
            }
        });
    }

    destroy() {
        this.storeUnsubscribe && this.storeUnsubscribe();
    }
}
