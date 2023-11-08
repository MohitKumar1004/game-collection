import styled,{ css } from 'styled-components'

export const StyledCss = css`
    width: 100vw;
    height: 100vh;
    background-image: url('${props => (props.imageUrl)?(props.imageUrl):''}');
    background-size: cover;
    overflow: hidden;
    transition: all 0.5s;
`

export const StyledHome = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('${props => (props.imageUrl)?(props.imageUrl):''}');
    background-size: cover;
    overflow: hidden;
`