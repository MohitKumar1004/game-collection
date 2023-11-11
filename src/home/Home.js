import React, { useEffect, useState } from 'react'

import data from './data'
import { StyledButton, StyledContent, StyledHome, StyledImage, StyledWrapper } from './styles/StyledHome'
import Navbar from './components/Navbar'
import { StyledArrow } from './styles/StyledArrow'
import { Link } from 'react-router-dom'

export default function Home(props) {

  const [index, setIndex] = useState(0)
  const [state, setState] = useState(data[index])

  const [animate, setAnimate] = useState('')
  const [animate2, setAnimate2] = useState(100)

  useEffect(() => {
    setState(data[index])
  },[index])

  useEffect(() => {
    setAnimate('')
    setAnimate2(100)
    setTimeout(() => {
      setAnimate('fadeIn')
      setAnimate2(0)
    },500)
    return (() => {
    })
  },[state.imageUrl])

  return (
    <StyledWrapper imageurl={state.imageUrl}>
    <Navbar/>
      <StyledImage animate={animate2} src={state.imageUrl} loading="lazy"/>
        <StyledHome>
          <StyledButton disabled={index === 0} onClick={() => setIndex(prev => prev - 1)}>
            <StyledArrow type='left'/>
          </StyledButton>
          <StyledContent animate={animate}>
            <h1>{`Title: ${state.title}`}</h1>
            <h3>{`Description: ${state.description}`}</h3>
            {
              (state.toLink === '') ? 'Game Not Found' : <Link to={state.toLink}>Click here to go to the game</Link>
              // (state.toLink === '') ? 'Game Not Found' : <a href={state.toLink} target="_blank">Click here to go to the game</a>
            }
          </StyledContent>
          <StyledButton disabled={index === data.length-1} onClick={() => setIndex(prev => prev + 1)}>
            <StyledArrow type='right'/>
          </StyledButton>
        </StyledHome>
    </StyledWrapper>
  )
}
