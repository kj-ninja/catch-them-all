import styled from 'styled-components';

export const PokemonRow = styled.div`
    display: flex;
    padding: 15px 10px;
    align-items: center;
    height: 80px;
    cursor: pointer;
    border-bottom: 2px solid #fff;
    
        &:hover {
            background-color: #ddd;
        }
`;

export const PokemonCol = styled.div`
    text-align: center;
    width: ${({width}) => width}%;
`;