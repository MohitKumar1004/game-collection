import styled from 'styled-components'

export const StyledNavbar = styled.div`
    width: 100vw;
    height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: linear-gradient(45deg,white,grey,white);
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
`

export const EndNavbar = styled.div`
    margin-right: 5vw;
    margin-left: auto;
`

export const StartNavbar = styled.div`
    margin-left: 5vw;
    margin-right: auto;
    display: flex;
    flex-wrap: wrap;
    gap: 0 2vw;
`