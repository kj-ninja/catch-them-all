import React from 'react';
import Logo from '../../assets/logo.png'
import PokemonList from "../../containers/PokemonList/PokemonList";
import {HomeContainer, HomeImage, HomePokemons, HomeLogo} from './Home.styles';

const Home = () => {
    return (
        <HomeContainer>
            <HomePokemons>
                <HomeLogo><img src={Logo} alt="logo"/></HomeLogo>
                <PokemonList/>
            </HomePokemons>
            <HomeImage/>
        </HomeContainer>
    );
};

export default Home;