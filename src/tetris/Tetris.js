import React, { useState } from 'react'

import { createStage, checkCollision } from './gameHelpers'

// Styled Components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'

// Custom Hooks
import { useInterval } from './hooks/useInterval'
import { usePlayer } from './hooks/usePlayer'
import { useStage } from './hooks/useStage'

// Components
import Display from './components/Display'
import StartButton from './components/StartButton'
import Stage from './components/Stage'
import { useGameStatus } from './hooks/useGameStatus'

function Tetris() {
  const [dropTime, setDropTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer()
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer)
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared)

  console.log('Tetris re-renders')

  const movePlayer = dir => {
    if(!checkCollision(player, stage, {
      x: dir,
      y: 0
    }))
    {
      updatePlayerPos({
        x: dir,
        y: 0
      })
    }
  }

  const startGame = () => {
    // Reset Everything
    setStage(createStage())
    setDropTime(500)
    resetPlayer()
    setGameOver(false)
    setScore(0)
    setRows(0)
    setLevel(0)
  }

  const drop = () => {
    // Increase level when player clears 10 rows
    if(rows > (level+1) * 10)
    {
      setLevel(prev => prev + 1)
      // Also increase speed
      setDropTime(500 / (level + 1) + 200)
    }

    console.log(player)
    console.log(stage)
    if(!checkCollision(player, stage, {
      x: 0,
      y: 1
    }))
    {   
      updatePlayerPos({
        x: 0,
        y: 1,
        collided: false
      })
    } else {
      // Game Over
      if(player.pos.y < 1) {
        console.log("GAME OVER!!!")
        setGameOver(true)
        setDropTime(null)
      }
      updatePlayerPos({
        x: 0,
        y: 0,
        collided: true
      })
    }
  }

  const keyUp = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 40) {
        console.log('interval on')
        setDropTime(500 / (level + 1) + 200)
      }
    }
  }

  const dropPlayer = () => {
    console.log('interval off')
    setDropTime(null)
    drop()
  }

  const move = ({ keyCode }) => {
    // console.log(keyCode)
    if(!gameOver) {
      if(keyCode === 37) {
        movePlayer(-1)
      } else if(keyCode === 39) {
        movePlayer(1)
      } else if(keyCode === 40) {
        dropPlayer()
      } else if(keyCode === 39) {
        movePlayer(1)
      } else if(keyCode === 38) {
        playerRotate(stage, 1)
      }
    }
  }

  useInterval(() => {
    drop()
  }, dropTime)

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <h1>Tetris</h1>
      <StyledTetris>
        <Stage stage={stage}/>
        <aside>
          {
            gameOver ? (
              <Display gameOver={gameOver} text="GameOver"/>
            ) : (
              <div>
                <Display text={`Score: ${score}`}/>
                <Display text={`Rows: ${rows}`}/>
                <Display text={`Level: ${level}`}/>
              </div>
            )
          }
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris

