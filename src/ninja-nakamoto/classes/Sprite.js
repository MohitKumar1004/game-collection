class Sprite {
    constructor({position, imageSrc, can, draw_, scale = 1, framesMax = 1, framesHold = 10 }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.can = can
        this.draw_ = draw_
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
    }

    draw() {
        this.draw_.drawImage(
            this.image,
            (this.image.width / this.framesMax) * this.framesCurrent,
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    update() {

        this.draw();

        this.framesElapsed++;

        if(this.framesElapsed % this.framesHold === 0) {
            if(this.framesCurrent < this.framesMax-1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }
}

export default Sprite