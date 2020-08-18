import styled from 'styled-components';
import img from '../../assets/background.png'

export const HomeContainer = styled.div`
    max-width: 1800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    
`;

export const HomeImage = styled.div`
    width: 49%;
    height: 106vh;
    background-image: url(${img});
    
    @media screen and (max-width: 1200px) {
        display: none;
    }
`;

export const HomePokemons = styled.div`
    width: 49%;
        @media screen and (max-width: 1200px) {
        width: 100%;
    }
    
`;

export const HomeLogo = styled.div`
    text-align: center;
    
    @media screen and (max-width: 1200px) {
        img {
            width: 300px;
        }    
    }
`;