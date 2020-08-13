import React from 'react';
import Logo from '../../assets/logo.png';
import './Pokemon.scss';

const Pokemon = ({pokemon}) => {
    console.log(pokemon);
    if (!pokemon) {
        console.log('???');
        return <h1>DUPA</h1>
    }

    return (
        <div className="pokemon">
            <div className="logo"><img src={Logo} alt="logo"/></div>
            <div className="pokemon-container">
                <div className="pokemon-image"><img src={pokemon.imageUrl} alt="pokemon"/></div>
                <div className="pokemon-stats">Ststystyki?</div>
            </div>
        </div>
    );
};

export default Pokemon;