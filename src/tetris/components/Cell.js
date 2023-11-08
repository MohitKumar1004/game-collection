import React, { memo } from 'react'
import { StyledCell } from '../styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

const Cell = ({ type }) => {
  return (
    <StyledCell type={TETROMINOS[type].type} color={TETROMINOS[type].color}>{console.log('re-render cell')}</StyledCell>
  )
} 

export default memo(Cell)