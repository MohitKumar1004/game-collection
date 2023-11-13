import styled from 'styled-components'

export const StyledCell = styled.div`
    width: auto;
    background: rgba(${props => props.color}, 0.8);
    border: ${props => (props.type === 0)?'0 px solid':'7px solid'};
    border-bottom-color: rgba(${props => props.color}, 0.1);
    border-top-color: rgba(${props => props.color}, 1);
    border-right-color: rgba(${props => props.color}, 1);
    border-left-color: rgba(${props => props.color}, 0.3);
    animation: ${props => props.animate ? 'fadeIn' : 'none'} 1s forwards;

    @keyframes fadeIn {
        0% {
            transform: scale(1);
            opacity:1;
        }
        100% {
            transform: scale(0);
            opacity:0;
        }
    }
`