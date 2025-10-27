class Character extends GameObject {
    constructor(config) {
        super(config);

        this.stepsRemaining = 0;

        this.bPlayerControlled = config.bPlayerControlled || false;

        this.directionUpdate = {
            "down": ["posY", 1],
            "up": ["posY", -1],
            "right": ["posX", 1],
            "left": ["posX", -1],
        }

        this.behaviorLoop = config.behaviorLoop || [{type:"idle", direction:"down"}];
    }

    update(state) {
        super.update(state);
        if (this.stepsRemaining > 0) {
            this.updatePos();
        }
        else {
            if (this.bPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            if (state.map.isSpaceTaken(this.posX, this.posY, this.direction)) {
                return;
            }
            this.stepsRemaining = 32;
        }
    }

    updatePos() {
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.stepsRemaining--;
    }

    updateSprite(state) {
        if (this.stepsRemaining > 0) {
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }
}