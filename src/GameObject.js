class GameObject {
    constructor(config) {
        /*character({
            sprite: ,
            posX: ,
            posY: ,
            orient: ,
        })*/

        this.id = null;

        this.posX = config.posX || 0;
        this.posY = config.posY || 0;
        this.direction = config.direction || "down";

        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "assets/Characters/IdleSpriteSheetTemplate.png",
            useShadow: config.useShadow,
            animations: config.animations
        });
    }

    mount(map){
        map.addWall(this.posX, this.posY);
        this.isMounted = true;

        setTimeout( e =>{if (this.behaviorLoop.length != null) 
        {
            this.doBehaviorEvent(map);
        }}, 10)

    }
    update(state) {

    }
}