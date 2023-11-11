import styled from 'styled-components'

export const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    opacity: 0;
    animation: ${props => props.animate} 2s forwards;

    @keyframes fadeIn {
        0% { opacity: 0; }
        100% { opacity: 1; }
    }
`

export const StyledButton = styled.button`
    background: none;
    border: none;
    height: 100%;
    width: 100%;
    transition: all 0.5s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.45);
    }

`

export const StyledWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;
`

export const StyledImage = styled.img`
    width: 100vw;
    height: 100vh;
    position: absolute;
    object-fit: cover;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    transition: all 5s;
    filter: blur(${props => props.animate}px);
`

export const StyledHome = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 20% auto 20%;
    background-color: rgba(255, 255, 255, 0.15);
    background-size: cover;
    overflow: hidden;

    @media (max-width: 480px) {
        grid-template-rows: 20% auto 20%;
        grid-template-columns: 1fr;
    }
`