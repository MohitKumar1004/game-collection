import React, { useEffect, useState } from 'react'

import data from './data'
import { StyledHome } from './styles/StyledHome'
import Navbar from './components/Navbar'

export default function Home(props) {

  const [index, setIndex] = useState(0)
  const [state, setState] = useState(data[index])

  useEffect(() => {
    setState(data[index])
  },[index])

  return (
    <StyledHome imageUrl={state.imageUrl}>
      <Navbar/>
      <div>
        <button disabled={index === 0} onClick={() => setIndex(prev => prev - 1)}>Prev</button>
        <button disabled={index === data.length-1} onClick={() => setIndex(prev => prev + 1)}>Next</button>
      </div>
      <h1>{`Title: ${state.title}`}</h1>
      <h3>{`Description: ${state.description}`}</h3>
    </StyledHome>
  )
}
