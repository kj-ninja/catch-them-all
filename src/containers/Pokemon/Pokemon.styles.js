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
    
    @media screen and (max-width: 700px) {
        img {
            width: 300px;
        }
    }
`;

export const PokemonImage = styled.div`
    @media screen and (max-width: 700px) {
        img {
            max-width: 100%;
        }
    }

`;

export const PokemonFooter = styled.div`
    display: flex;
    justify-content: space-between;
    width: 600px;
    margin: 30px auto;
    align-items: center;
    
    @media screen and (max-width: 700px) {
        width: 350px
    }
`;

export const PokemonName = styled.div`
    color: #2365b5;
    font-size: 24px;
    font-weight: bold;
    
    @media screen and (max-width: 700px) {
        font-size: 18px;
    }
`;

export const PokemonButton = styled.div`
    background-color: #ffe400;
    padding: 10px 15px;
    color: #2365b5;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
    
    @media screen and (max-width: 700px) {
        width: 100px;
        font-size: 16px;
        padding: 5px 3px;
    }
    
        .fa-angle-left {
            margin-right: 10px;
        }
        
        .fa-angle-right {
            margin-left: 10px;
        }
`;
