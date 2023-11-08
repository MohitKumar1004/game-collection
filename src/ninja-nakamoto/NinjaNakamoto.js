import React, { useRef, useEffect } from 'react'

function NinjaNakamoto() {

    const canva = useRef(null)

    const initGame = () => {
        canva.current.width = 1024;
        canva.current.height = 576;

        const gravity = .7;

        const can = canva.current;
        const draw_ = can.getContext("2d");

        class Sprite{
            constructor({position, velocity, color = "red", offset }) {
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
            }
    
            draw() {
                // drawing players
                draw_.fillStyle = this.color;
                draw_.fillRect(this.position.x,this.position.y,this.width,this.height);

                // attack box
                if(this.isAttacking) {
                    draw_.fillStyle = 'green';
                    draw_.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,this.attackBox.height);
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
                if(this.position.y + this.height + this.velocity.y >= can.height){
                    // players inertia after fall
                    this.velocity.y = - Math.floor(this.velocity.y/2)
                } else {
                    this.velocity.y += gravity;
                }
            }

            attack() {
                this.isAttacking = true
                setTimeout(() => {
                    this.isAttacking = false
                }, 1000)
            }
        }

        // Creating player
        const player = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            velocity: {
                x: 0,
                y: 2
            },
            color: 'blue',
            offset: {
                x: 0,
                y: 0
            }
        });

        // Creating enemy
        const enemy = new Sprite({
            position: {
                x: 400,
                y: 100
            },
            velocity: {
                x: 0,
                y: 0
            },
            color: 'red',
            offset: {
                x: -50,
                y: 0
            }
        });

        const keys = {
            a: {
                pressed: false
            },
            d: {
                pressed: false
            },
            ArrowLeft: {
                pressed: false
            },
            ArrowRight: {
                pressed: false
            }
        }

        const rectangleCollision = ({ rectangle1, rectangle2 }) => {
            return (
                // Forward
                rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
                // Backward
                rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
                // Top
                rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
                // Backward
                rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
            )
        }

        const determineWinner = ({ player, enemy, timerId }) => {
            clearTimeout(timerId)
            document.querySelector('#displayText').style.display = 'flex';
            if(player.health === enemy.health) {
                document.querySelector('#displayText').innerHTML = 'Tie';
            } else if(player.health > enemy.health) {
                document.querySelector('#displayText').innerHTML = 'Player 1 Wins';
            } else {
                document.querySelector('#displayText').innerHTML = 'Player 2 Wins';
            }
        }

        let timer = 10
        let timerId
        const decreaseTimer = () => {
            if(timer>0) {
                timerId = setTimeout(decreaseTimer, 1000)
                timer--
                document.querySelector('#timer').innerHTML = timer;
            }

            if(timer === 0) {
                determineWinner({ player, enemy, timerId })
            }
        }

        decreaseTimer();

        // Creating function for animation frames
        const animate = () => {
            window.requestAnimationFrame(animate);
            draw_.fillStyle = 'black'
            draw_.fillRect(0, 0, can.width, can.height);
            player.update()
            enemy.update()
            player.velocity.x = 0
            enemy.velocity.x = 0

            // Player Movements
            if(keys.a.pressed && player.lastKey === 'a') {
                player.velocity.x = -5;
            } else if(keys.d.pressed && player.lastKey === 'd') {
                player.velocity.x = 5;
            }

            // Enemy Movements
            if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
                enemy.velocity.x = -5;
            } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
                enemy.velocity.x = 5;
            }

            // Player Detect for collision
            if(
                rectangleCollision({
                    rectangle1: player,
                    rectangle2: enemy
                }) &&
                // Attack State
                player.isAttacking
                ) {
                    player.isAttacking = false
                    enemy.health -= 10
                    document.querySelector('#enemy-health').style.width = `${enemy.health}%`;
            }

            // Enemy Detect for collision
            if(
                rectangleCollision({
                    rectangle1: enemy,
                    rectangle2: player
                }) &&
                // Attack State
                enemy.isAttacking
                ) {
                    enemy.isAttacking = false
                    player.health -= 10
                    document.querySelector('#player-health').style.width = `${player.health}%`;
            }

            if(enemy.health<=0 || player.health<=0) {
                determineWinner({ player, enemy, timerId })
            }
        }

        // Calling animation frames
        animate()

        window.addEventListener('keydown', (evt) => {
            switch(evt.key) {
                // Start Player Movement
                case 'a':
                    keys.a.pressed = true;
                    player.lastKey = evt.key;
                    break;
                case 'd': 
                    keys.d.pressed = true;
                    player.lastKey = evt.key;
                    break;
                case 'w': 
                    player.velocity.y = -20;
                    break;
                case 'e': 
                    player.attack()
                    break;

                // Start Enemy Movement
                case 'ArrowRight':
                    keys.ArrowRight.pressed = true;
                    enemy.lastKey = evt.key;
                    break;
                case 'ArrowLeft': 
                    keys.ArrowLeft.pressed = true;
                    enemy.lastKey = evt.key;
                    break;
                case 'ArrowUp': 
                    enemy.velocity.y = -20;
                    break;
                case ' ': 
                    enemy.attack()
                    break;
            }
        })
        window.addEventListener('keyup', (evt) => {
            switch(evt.key) {
                // Stop Player Movement
                case 'a':
                    keys.a.pressed = false;
                    break;
                case 'd': 
                    keys.d.pressed = false;
                    break;

                // Stop Enemy Movement
                case 'ArrowRight':
                    keys.ArrowRight.pressed = false;
                    break;
                case 'ArrowLeft': 
                    keys.ArrowLeft.pressed = false;
                    break;
            }
        })
    }


    useEffect(() => {
        initGame()
    },[])

    return (
        <div style={{position: 'relative',display: 'inline-block', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute',display: 'flex',width: '100%', alignItems: 'center',padding: '20px', boxSizing: 'border-box'}}>
                {/* Player Health */}
                <div style={{position:'relative',height: '30px',width: '100%',display: 'flex',justifyContent: 'flex-end'}}>
                    <div style={{backgroundColor: 'yellow',height: '30px',width: '100%'}}></div>
                    <div id="player-health" style={{position:'absolute',backgroundColor: 'blue',height: '30px',top: '0', right: '0', bottom: '0',width: '100%'}}></div>
                </div>
                {/* Timer */}
                <div id="timer" style={{backgroundColor: 'red', width: '100px', height: '100px', flexShrink: '0',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    10
                </div>
                {/* Enemy Health */}
                <div style={{position:'relative',height: '30px',width: '100%'}}>
                    <div style={{backgroundColor: 'yellow',height: '30px'}}></div>
                    <div id="enemy-health" style={{position:'absolute',backgroundColor: 'blue',height: '30px',top: '0',left: '0', right: '0', bottom: '0'}}></div>
                </div>
            </div>
            <div id="displayText" style={{position:'absolute',color: 'white',display: 'none',alignItems: 'center',justifyContent: 'center',top: '0',left: '0', right: '0', bottom: '0'}}></div>
            <canvas ref={canva}>
            </canvas>
        </div>
    )
}

export default NinjaNakamoto