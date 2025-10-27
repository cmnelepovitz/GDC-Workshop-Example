class Sprite {
    constructor(config) {
        // Passing Config References
        this.gameObject = config.gameObject;

        //Image settings

        this.sprite = new Image();
        this.sprite.onload = () => {
            this.spriteLoaded = true;
        };
        this.sprite.src = config.src;

        //this.preload(config);

        this.useShadow = config.useShadow;
        if (this.useShadow === true) {
            this.shadow = new Image();
            this.shadow.onload = () => {
                this.shadowLoaded = true;
            };
            this.shadow.src = "assets/characters/ShadowSprites.png";
        };

        //Configure Animation and State
        this.animations = config.animations || {
            "idle-down": [
                [0, 4]
            ],

            "idle-left": [
                [1, 4]
            ],

            "idle-right": [
                [2, 4]
            ],

            "idle-up": [
                [3, 4]
            ],

            "walk-down": [
                [0, 0], [1, 0], [2, 0], [3, 0]
            ],

            "walk-right": [
                [0, 2], [1, 2], [2, 2], [3, 2]
            ],

            "walk-left": [
                [0, 1], [1, 1], [2, 1], [3, 1]
            ],

            "walk-up": [
                [0, 3], [1, 3], [2, 3], [3, 3]
            ]
        }

        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimation() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }

        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, camCenter) {
            const X = this.gameObject.posX + utils.GridToPos(6) - camCenter.posX + 1; // +- offset;
            const Y = this.gameObject.posY + utils.GridToPos(3) - camCenter.posY; // +- offset;

            const [frameX, frameY] = this.frame;

            this.shadowLoaded && ctx.drawImage(
                this.shadow,
                0, 0, 64, 64,
                X + 1.95, Y + 1, 124, 124
            );

            this.spriteLoaded && ctx.drawImage(
                this.sprite,
                frameX * 64, frameY * 64, 64, 64,
                X, Y, 128, 128
            );

            this.updateAnimation();
    }
}