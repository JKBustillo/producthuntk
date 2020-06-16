import styled from '@emotion/styled';

const Button = styled.a`
    font-weight: 700;
    text-transform: uppercase;
    border: 1px solid #1d1d1d;
    padding: .8rem 2rem;
    margin-right: 1rem;
    background-color: ${props => props.bgColor ? '#DA552F' : 'white'};
    color: ${props => props.bgColor ? 'white' : 'black'};

    &:last-of-type {
        margin-top: 0;
    }

    &:hover {
        cursor: pointer;
    }
`;

export default Button;