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
    height: 104vh;
    background-image: url(${img});
`;

export const HomePokemons = styled.div`
    width: 49%;
`;

export const HomeLogo = styled.div`
    text-align: center;
`;