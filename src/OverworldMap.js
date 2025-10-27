import { HospitalMapWalls } from "./assets/maps/SampleMap/SampleMapWalls.js";

export class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowersrc;

        this.upperImage = new Image();
        this.upperImage.src = config.uppersrc;
    }

    drawLowerMap(ctx, camCenter) {
        ctx.drawImage(
            this.lowerImage,
            utils.GridToPos(7.5) - (camCenter.posX), utils.GridToPos(5) - (camCenter.posY),
            // utils.Grid(16), utils.Grid(12),
            // //this.lowerImage.width / 2, this.lowerImage.height / 2,
            // 0, 0, 0, 0
        );

        /*ctx.drawImage(
            this.lowerImage,
            Math.max(this.gameObjects.Winslow.posX * 32 - 64, 0), Math.max(this.gameObjects.Winslow.posY * 32 - 64, 0),
            this.lowerImage.width/2, this.lowerImage.height/2,
            0, 0,
            ctx.canvas.width, ctx.canvas.height
        );*/
    }

    drawUpperMap(ctx, camCenter) {
        ctx.drawImage(
            this.upperImage,
            0, 0
        );
    }

    isSpaceTaken(initx, inity, dir){
        const {x,y} = utils.nextPos(initx, inity, dir);
        return this.walls[`${x},${y}`] || false;
    }

    addWall(x, y){
        this.walls[utils.asMapCoord(x,y)] = true;
    }

    destroyWall(x, y){
        delete this.walls[utils.asMapCoord(x,y)];
    }

    moveWall(xi, yi, dir){
        this.destroyWall(xi, yi);
        const {x,y} = utils.nextPos(xi, yi, dir);
        this.addWall(x, y);
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key => {
            let obj = this.gameObjects[key];
            obj.id = key;

            obj.mount(this);
        });
    }
}


export const OverworldMaps = {
    //list of maps to be used in entire game
        Hospital: {
            lowersrc: "assets/maps/Hospital/HospitalMapBlock.png",
            uppersrc: " ",
            gameObjects: {
                NPCAsleep: new Character({
                    posX: utils.GridToPos(1.1),
                    posY: utils.GridToPos(9.2),
                    src: "assets/characters/NPCAsleep.png",
                    useShadow: false,
                    animations: {"idle-down": [[0, 0]]}
                }),
                PC: new Character({
                    posX: utils.GridToPos(8),
                    posY: utils.GridToPos(22),
                    src: "assets/characters/PCWalkAndIdle.png",
                    bPlayerControlled: true,
                    useShadow: true
                }),
                NPC1: new Character({
                    posX: utils.GridToPos(5),
                    posY: utils.GridToPos(19),
                    useShadow: true
                }),
            },
           walls: HospitalMapWalls  
    }
}
