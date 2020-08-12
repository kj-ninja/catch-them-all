import React from 'react';
import './Home.scss'
import Logo from '../../assets/logo.png'
import PokemonList from "../PokemonList/PokemonList";

const Home = () => {
    return (
        <div className="home">
            <div className="background"/>
            <div className="main">
                <h1><img src={Logo} alt="logo"/></h1>
                <PokemonList/>
            </div>
        </div>
    );
};

export default Home;