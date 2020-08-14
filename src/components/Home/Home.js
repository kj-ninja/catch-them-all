import React from 'react';
import Logo from '../../assets/logo.png'
import PokemonList from "../../containers/PokemonList/PokemonList";
import {HomeContainer, HomeImage, HomePokemons, HomeLogo} from './Home.styles';

const Home = () => {
    return (
        <HomeContainer>
            <HomeImage/>
            <HomePokemons>
                <HomeLogo><img src={Logo} alt="logo"/></HomeLogo>
                <PokemonList/>
            </HomePokemons>
        </HomeContainer>
    );
};

export default Home;