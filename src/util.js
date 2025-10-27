const utils = {
    GridToPos(n) {
        return n * 32;
    },
    PosToGrid(n){
        return n / 32;
    },
    asMapCoord(x, y){
        return `${x*32},${y*32}`;
    },

    nextPos(initX, initY, dir){
        let x = initX;
        let y = initY;
        const step = 32;
        switch (dir){
            case "left":
                x -= step;
                break;
            case "right":
                x += step;
                break;
            case "up":
                y -= step;
                break;
            case "down":
                y += step;
                break;
        }
        return {x,y};
    }
}
