import React, { useRef, useEffect } from 'react'
import useGame from './hooks/useGame'

function NinjaNakamoto() {

    const canva = useRef(null)

    const [initGame] = useGame({ canva })

    useEffect(() => {
        initGame()
    },[])

    return (
        <div style={{position: 'relative',display: 'inline-block', boxSizing: 'border-box'}}>
            <div style={{position: 'absolute',display: 'flex',width: '100%', alignItems: 'center',padding: '20px', boxSizing: 'border-box'}}>
                {/* Player Health */}
                <div style={{position:'relative',height: '30px',width: '100%',display: 'flex',justifyContent: 'flex-end'}}>
                    <div style={{backgroundColor: 'yellow',height: '30px',width: '100%'}}></div>
                    <div id="player-health" style={{position:'absolute',backgroundColor: 'blue',height: '30px',top: '0', right: '0', bottom: '0',width: '100%'}}></div>
                </div>
                {/* Timer */}
                <div id="timer" style={{backgroundColor: 'red', width: '100px', height: '100px', flexShrink: '0',display: 'flex',alignItems: 'center',justifyContent: 'center'}}>
                    10
                </div>
                {/* Enemy Health */}
                <div style={{position:'relative',height: '30px',width: '100%'}}>
                    <div style={{backgroundColor: 'yellow',height: '30px'}}></div>
                    <div id="enemy-health" style={{position:'absolute',backgroundColor: 'blue',height: '30px',top: '0',left: '0', right: '0', bottom: '0'}}></div>
                </div>
            </div>
            <div id="displayText" style={{position:'absolute',color: 'white',display: 'none',alignItems: 'center',justifyContent: 'center',top: '0',left: '0', right: '0', bottom: '0'}}></div>
            <canvas ref={canva}>
            </canvas>
        </div>
    )
}

export default NinjaNakamoto