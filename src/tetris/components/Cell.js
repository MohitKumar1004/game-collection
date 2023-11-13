import React, { memo } from 'react'
import { StyledCell } from '../styles/StyledCell'
import { TETROMINOS } from '../tetrominos'

const Cell = ({ type, animate }) => {
  return (
    <StyledCell type={TETROMINOS[type].type} color={TETROMINOS[type].color} animate={animate}>
      {/* {console.log('re-render cell')} */}
      </StyledCell>
  )
} 

export default memo(Cell)