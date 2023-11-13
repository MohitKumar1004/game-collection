import { useState, useEffect } from "react";
import { createStage } from '../gameHelpers'

export const useStage = (player, resetPlayer) => {

    const [stage, setStage] = useState(createStage())
    const [rowsCleared, setRowsCleared] = useState(0)
    const [trueRows, setTrueRows] = useState(false)

    useEffect(() => {

        setRowsCleared(0)

        const sweepRows = newStage => 
            // Checks if elements of rows have 0 on all cell[0]
            newStage.reduce((ack, row) => {
                let index = row.findIndex(cell => cell[0] === 0 || cell[2] === true)
                if(index === -1) {
                    console.log(row)
                    row.forEach((cell) => {
                        cell[2] = true;
                        return cell
                    })
                    setRowsCleared(prev => prev + 1)
                    console.log(row)
                    ack.unshift(new Array(newStage[0].length).fill([0,'clear']))
                    ack.push(row)
                    return ack
                }
                let index2 = row.findIndex(cell => (cell[2] === true))
                if(index2 > -1) {
                    setRowsCleared(prev => prev + 1)
                    // Push an empty row at Beginning
                    return ack
                }
                // Push the next row at End
                ack.push(row)
                return ack
            },[])

        const checkTrueRows = newStage => {
            let ans = false
            newStage.map((row) => {
                if(row[0][2] === true)
                {
                    ans = true;
                }
            })
            return ans;
        }
        const changeTrueRows = newStage => 
        newStage.reduce((ack, row) => {
            let index2 = row.findIndex(cell => (cell[2] === true))
            if(index2 > -1) {
                // Push an empty row at Beginning
                // ack.unshift(new Array(newStage[0].length).fill([0,'clear']))
                return ack
            }
            // Push the next row at End
            ack.push(row)
            return ack
        },[])

        const updateStage = (prevStage) => {
            // First flash the stage
            const newStage = prevStage.map(row => 
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear',false] : cell))
            )

            // Then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value,x) => {
                    if(value!==0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                            false
                        ]
                    }
                })
            })

            if(checkTrueRows(newStage) && trueRows > 0)
            {
                setTrueRows(false)
                return changeTrueRows(newStage)
            }

            // Then check if we collided
            if(player.collided) {
                resetPlayer()
                setTrueRows(0)
                return sweepRows(newStage)
            }
            setTrueRows(prev => prev+1)
            return newStage
        }
        
        setStage(prev => updateStage(prev))
    }, [player, resetPlayer])
    
    return [stage, setStage, rowsCleared, trueRows]
}