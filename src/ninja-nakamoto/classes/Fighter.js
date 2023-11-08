import Sprite from "./Sprite"

class Fighter extends Sprite{
    constructor({position, velocity, color = "red", offset, gravity, can, draw_ }) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey = ''
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking = false
        this.health = 100
        this.gravity = gravity
        this.can = can
        this.draw_ = draw_
    }

    draw() {
        // drawing players
        this.draw_.fillStyle = this.color;
        this.draw_.fillRect(this.position.x,this.position.y,this.width,this.height);

        // attack box
        if(this.isAttacking) {
            this.draw_.fillStyle = 'green';
            this.draw_.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
        }
    }

    update() {

        this.draw();

        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // player moving
        this.position.x += this.velocity.x;

        // players falling to ground
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y >= this.can.height - 96){
            // players inertia after fall
            this.velocity.y = - Math.floor(this.velocity.y/2)
        } else {
            this.velocity.y += this.gravity;
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 1000)
    }
}

export default Fighter