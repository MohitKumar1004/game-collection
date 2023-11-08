import React from 'react'
import Fighter from '../classes/Fighter';
import Sprite from '../classes/Sprite';
import backSrc from '../img/background.png'
import shopSrc from '../img/shop.png'
import useUtils from './useUtils';

export default function useGame({ canva }) {

    const [rectangleCollision,determineWinner,decreaseTimer] = useUtils()

    const initGame = () => {
        canva.current.width = 1024;
        canva.current.height = 576;

        const gravity = .7;

        const can = canva.current;
        const draw_ = can.getContext("2d");

        const background = new Sprite({
            position: {
                x: 0,
                y: 0
            },
            imageSrc: backSrc,
            can,
            draw_
        })

        const shop = new Sprite({
            position: {
                x: 600,
                y: 128
            },
            imageSrc: shopSrc,
            can,
            draw_,
            scale: 2.75,
            framesMax: 6,
            framesHold: 5
        })

        // Creating player
        const player = new Fighter({
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
            },
            gravity,
            can,
            draw_
        });

        // Creating enemy
        const enemy = new Fighter({
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
            },
            gravity,
            can,
            draw_
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

        let timer = 10
        let timerId

        decreaseTimer({ player, enemy, timer, timerId });

        // Creating function for animation frames
        const animate = () => {
            window.requestAnimationFrame(animate);
            draw_.fillStyle = 'black'
            draw_.fillRect(0, 0, can.width, can.height);
            background.update()
            shop.update()
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

    return [initGame]
}
