import { useState, useEffect } from "react";
import { createStage } from '../gameHelpers'

export const useStage = (player, resetPlayer) => {

    const [stage, setStage] = useState(createStage())
    const [rowsCleared, setRowsCleared] = useState(0)

    useEffect(() => {

        setRowsCleared(0)

        const sweepRows = newStage => 
            // Checks if elements of rows have 0 on all cell[0]
            newStage.reduce((ack, row) => {
                if(row.findIndex(cell => cell[0] === 0) === -1) {
                    setRowsCleared(prev => prev + 1)
                    // Push an empty row at Beginning
                    ack.unshift(new Array(newStage[0].length).fill([0,'clear']))
                    return ack
                }
                // Push the next row at End
                ack.push(row)
                return ack
            },[])

        const updateStage = prevStage => {
            // First flash the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            )

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value,x) => {
                    if(value!==0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`
                        ]
                    }
                })
            })

            // Then check if we collided
            if(player.collided) {
                resetPlayer()
                return sweepRows(newStage)
            }
            return newStage
        }
        
        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])
    
    return [stage, setStage, rowsCleared]
}