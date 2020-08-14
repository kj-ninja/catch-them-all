import styled from 'styled-components';

export const PokedexContainer = styled.div`
    width: 85%;
    margin: 30px auto;
    background-color: #eee;
    color: #2365b5;
    
    @media screen and (max-width: 700px) {
        font-size: 14px;
`;

export const PokedexHeaderRow = styled.div`
    display: flex;
    padding: 15px 10px;
    align-items: center;
    height: 80px;
    cursor: pointer;
    border-bottom: 2px solid #fff;
    background-color: #ffe400;
    cursor: default;
    font-weight: bold;
    font-family: 'Passion One', cursive;
    font-size: 20px;
    
    
    &:hover {
      background-color: #ffe400;
    }
`;

export const PokedexPaginationRow = styled.div`
    justify-content: center;
    background-color: #fff;
    font-family: 'Passion One', cursive;
    display: flex;
    padding: 15px 10px;
    align-items: center;
    height: 80px;
    cursor: pointer;
    border-bottom: 2px solid #fff;

    &:hover {
      background-color: #fff;
    }
`;

export const PokedexCol = styled.div`
        text-align: center;
        width: ${({width}) => width}%;
`;