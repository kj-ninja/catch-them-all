import styled from 'styled-components';

export const PokemonContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`;

export const PokemonLogo = styled.div`
    margin-bottom: 30px;
    cursor: pointer;
`;

export const Container = styled.div`
    display: flex;
    max-width: 1600px;
    margin: 0 auto;
    flex-direction: row;
`;

export const PokemonStats = styled.div`
    padding-top: 100px;
    margin-left: 30px;
`;

export const PokemonFooter = styled.div`
    display: flex;
    justify-content: space-between;
    width: 600px;
    margin: 30px auto;
    align-items: center;
`;

export const PokemonName = styled.div`
    color: #2365b5;
    font-size: 24px;
    font-weight: bold;
`;

export const PokemonButton = styled.div`
    background-color: #ffe400;
    padding: 10px 15px;
    color: #2365b5;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    
        .fa-angle-left {
            margin-right: 10px;
        }
        
        .fa-angle-right {
            margin-left: 10px;
        }
`;

