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

export const PokemonSpecies = styled.div`
    display: flex;
    justify-content: space-between;
    
    @media screen and (max-width: 700px) {
    flex-direction: column;
    img {
        max-width: 100%;
    }
}

`;

export const PokemonImage = styled.div`
    width: 58%;
    display: flex;
    justify-content: flex-end;
    
    @media screen and (max-width: 700px) {
        width: 100%;
    }
`;

export const PokemonDescription = styled.div`
    width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-transform: capitalize;
    
    #pokemonName {
        margin-bottom: 0;
    }
    
    div {
        margin-bottom: 30px;
    }
    
    span {
        font-weight: bold;
        display: inline-block;
        margin-bottom: 10px;
    }
    
    @media screen and (max-width: 700px) {
        width: 100%;
        padding: 10px;

    }
`;

export const PokemonFooter = styled.div`
    display: flex;
    justify-content: space-between;
    width: 800px;
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

