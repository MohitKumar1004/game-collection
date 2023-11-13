import React from 'react'
import { StyledStartButton } from '../styles/StyledStartButton'

export default function StartButton({ callback, gameOver }) {
  return (
    <StyledStartButton onClick={callback}>
      { gameOver ? 'Reset Game' : 'Start Game' }
    </StyledStartButton>
  )
}
