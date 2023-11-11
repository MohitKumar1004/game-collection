import styled from 'styled-components'

export const StyledArrow = styled.div`
    border: solid black;
    border-width: 0 3vh 3vh 0 ;
    display: inline-block;
    padding: 4vh;
    border-color: white;
    border-radius: 20px;
    margin-bottom: 0.53vh;
    transition: all 0.5s ease;
    transform: ${props => {
            switch(props.type) {
                case 'down':
                    return 'rotate(45deg)';
                case 'left':
                    return 'rotate(135deg)';
                case 'up':
                    return 'rotate(-135deg)';
                case 'right':
                    return 'rotate(-45deg)';
            }
        }
    };
    -webkit-transform: ${props => {
            switch(props.type) {
                case 'down':
                    return 'rotate(45deg)';
                case 'left':
                    return 'rotate(135deg)';
                case 'up':
                    return 'rotate(-135deg)';
                case 'right':
                    return 'rotate(-45deg)';
            }
        }
    };
`