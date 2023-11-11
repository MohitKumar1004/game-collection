import React from 'react'
import { EndNavbar, StartNavbar, StyledNavbar } from "../styles/StyledNavbar";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const coins = useSelector(state => state.coins)
    return (
        <StyledNavbar>
            <StartNavbar>
                <div><Link to="/game-collection/game/tetris">Tetris</Link></div>
                <div><Link to="/game-collection/game/pingpong">Ping Pong</Link></div>
                <div><Link to="/game-collection/game/ninjanakamoto">Ninja Nakamoto</Link></div>
            </StartNavbar>
            <EndNavbar>
                {coins}
            </EndNavbar>
        </StyledNavbar>
    )
}
