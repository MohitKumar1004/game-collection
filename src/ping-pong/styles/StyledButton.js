import styled from 'styled-components'

export const StyledButton = styled.div`
    postion: fixed;
    padding: 10px;
    border-radius: 20px;
    background-color: white;
    cursor: pointer;
    transition: all 0.5s;
    &:hover {
        background-color: black;
        color: white;
    }
`