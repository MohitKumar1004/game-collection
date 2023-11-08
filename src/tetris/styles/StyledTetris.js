import styled from "styled-components";

import bgImage from "../img/bg.png";

export const StyledTetrisWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: url(${bgImage}) #000;
    background-size: cover;
    overflow: hidden;

    h1{
        font-family: Pixel, Arial, Heltivica, sans-serif;
        background: -webkit-linear-gradient(red, green, blue);
        font-size: 3rem;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`

export const StyledTetris = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 900;

    aside{
        width: 100%;
        max-width: 200px;
        display: block;
        padding: 0 20px;
    }
`