import React from 'react'

export default function useUtils() {

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

    const decreaseTimer = ({ player, enemy, timer, timerId }) => {
        if(timer>0) {
            timer--
            timerId = setTimeout(() => decreaseTimer({ player, enemy, timer, timerId }), 1000)
            document.querySelector('#timer').innerHTML = timer;
        }

        if(timer === 0) {
            determineWinner({ player, enemy, timerId })
        }
    }

    return [rectangleCollision,determineWinner,decreaseTimer]
}
